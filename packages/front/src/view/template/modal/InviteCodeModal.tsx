import React, { useEffect, useState } from "react"
import c from "classnames"
import { Dialog } from "@headlessui/react"
import { ArrowRight, Check, Copy } from "react-feather"
import useSWR from "swr"
import { ROLES } from "../../../constants/role"
import { OwnedBook, Role } from "../../../types/models"
import BaseModal from "../../base/BaseModal"
import { AuthUser } from "../../../provider/LiffProvider"
import { apiClient } from "../../../lib/apiClient"
import { canUseShare, shareAPI } from "../../../lib/navigator/share"
import generateInviteUrl from "../../../service/generateInviteUrl"

export type InviteCodeModalProps = {
  open: boolean
  onClose: () => void
  authUser: AuthUser
  ownedBook: OwnedBook
}

const useFetchInviteCode = (role: Role | null, authUser: AuthUser, bookId: string) =>
  useSWR(role == null ? null : role, async (role) => {
    const token = await authUser.token()
    const res = await apiClient().post(
      { url: "/book/{bookId}/collaborators/invite-code", params: { bookId } },
      {
        role,
      },
      {
        Authorization: `Bearer ${token}`,
      },
    )
    return res.data.inviteCode
  })

const InviteCodeModal: React.VFC<InviteCodeModalProps> = ({ open, onClose, authUser, ownedBook }) => {
  const [role, setRole] = useState<Role | null>(null)
  const [copyDone, setCopyDone] = useState(false)

  const { data: inviteCode, isValidating } = useFetchInviteCode(role, authUser, ownedBook.book.id)

  const handleSelectRole = async (role: Role) => {
    if (canUseShare()) {
      if (inviteCode == null) {
        return
      }
      await shareAPI({
        title: "riffle",
        text: `${ownedBook.book.title}に招待されています`,
        url: generateInviteUrl(inviteCode),
      })
        .then(console.log)
        .catch(console.log)
    } else {
      setRole(role)
    }
  }

  const handleShare = async () => {
    if (inviteCode == null) {
      return
    }
    if ("share" in navigator) {
      await navigator.share({
        title: "riffle",
        text: `${ownedBook.book.title}に招待されています`,
        url: generateInviteUrl(inviteCode),
      })
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(generateInviteUrl(inviteCode))
      setCopyDone(true)
    }
  }

  useEffect(() => {
    if (open) {
      setRole(null)
      setCopyDone(false)
    }
  }, [open])

  return (
    <BaseModal open={open} onClose={onClose}>
      <div className="space-y-4">
        <Dialog.Title className="text-sm text-left">招待URLの発行</Dialog.Title>
        {role == null && (
          <div className="flex flex-col w-full space-y-1">
            {ROLES.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleSelectRole(value)}
                className="flex items-center justify-center flex-1 py-4 space-x-2 text-sm text-gray-600 rounded bg-gray-50"
              >
                <span>{label}として招待</span>
                <ArrowRight size="16px" />
              </button>
            ))}
          </div>
        )}
        {role != null && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 text-start">このURLをともだちに送りましょう</p>
            <button onClick={handleShare} className="flex items-center w-full pr-4 rounded bg-gray-50">
              <input
                type="text"
                // TODO: replace correct url
                value={inviteCode == null ? "読み込み中" : generateInviteUrl(inviteCode)}
                disabled
                className="w-full py-2 pl-4 pr-1 text-xs text-gray-500"
              />
              <Copy size="18px" stroke={inviteCode == null ? "rgb(107, 114, 128)" : "#333"} />
            </button>
            <p
              className={c(
                "flex items-center justify-center space-x-1 text-xs transition",
                copyDone ? "opacity-100" : "opacity-0",
              )}
            >
              <Check size="16px" stroke="rgb(52, 211, 153)" strokeWidth={2} />
              <span className="text-gray-400">URLをクリップボードにコピーしました</span>
            </p>
          </div>
        )}
      </div>
    </BaseModal>
  )
}

export default InviteCodeModal
