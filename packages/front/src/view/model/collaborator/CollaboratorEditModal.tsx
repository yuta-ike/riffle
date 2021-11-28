import React, { useCallback, useState } from "react"
import { useSWRConfig } from "swr"
import { ROLE_LABELS } from "../../../constants/role"
import { useRequest } from "../../../lib/apiClient/hooks"
import { useModal } from "../../../provider/ModalProvider"
import { Collaborator, OwnedBook, Role } from "../../../types/models"
import BottomModal from "../../base/BottomModal"
import SelectButton from "../../components/SelectButton"

export type CollaboratorEditModalProps = {
  open: boolean
  onClose: () => void
  ownedBook: OwnedBook
  collaborator: Collaborator
}

const CollaboratorEditModal: React.VFC<CollaboratorEditModalProps> = ({ open, onClose, ownedBook, collaborator }) => {
  const [selectedRole, setSelectedRole] = useState<Role>(collaborator.role as Role)
  const { show } = useModal()
  const { put, deleteRequest } = useRequest()
  const { mutate } = useSWRConfig()

  const handleSendRoleChange = useCallback(async () => {
    await put(
      {
        url: "/book/{bookId}/collaborators/{collaboratorId}",
        params: { bookId: ownedBook.book.id, collaboratorId: collaborator.id },
      },
      {
        role: selectedRole,
      },
    )
    await show("complete", "ロールの変更が完了しました")
    mutate(`/owned-book/${ownedBook.id}`)
  }, [collaborator.id, mutate, ownedBook.book.id, ownedBook.id, put, selectedRole, show])

  const handleKickUser = useCallback(async () => {
    const confirm = await show(
      "confirm",
      "本当にユーザーをキックしますか？（キックされたユーザーはこの単語帳にアクセスできなくなります）",
    )
    if (!confirm) {
      return
    }
    await deleteRequest({
      url: "/book/{bookId}/collaborators/{collaboratorId}",
      params: { bookId: ownedBook.book.id, collaboratorId: collaborator.id },
    })
    // TODO: 流石に🎉は良くないので変更したい
    await show("complete", "処理が完了しました")
    mutate(`/owned-book/${ownedBook.id}`)
  }, [collaborator.id, deleteRequest, mutate, ownedBook.book.id, ownedBook.id, show])

  return (
    <BottomModal open={open} onClose={onClose} height="short" title="ロールの変更">
      <div className="flex flex-col items-start">
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <h2>{collaborator.user.name} さん</h2>
            <div className="flex w-full">
              {(["owner", "editor", "viewer"] as const).map((role, index) => (
                <SelectButton
                  key={role}
                  selected={role === selectedRole}
                  isFirst={index === 0}
                  isLast={index === 2}
                  onClick={() => setSelectedRole(role)}
                >
                  {ROLE_LABELS[role]}
                </SelectButton>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="w-full px-3 py-2 border-2 border-solid rounded-lg text-primary border-primary/80 disabled:text-gray-300 disabled:border-gray-200 "
              disabled={selectedRole === collaborator.role}
              onClick={handleSendRoleChange}
            >
              変更を反映
            </button>
          </div>
        </div>
        <hr className="w-full mt-8 mb-4" />
        <button className="text-sm text-gray-400 underline" onClick={handleKickUser}>
          ユーザーをキックする
        </button>
      </div>
    </BottomModal>
  )
}

export default CollaboratorEditModal
