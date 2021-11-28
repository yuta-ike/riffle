import React, { useState } from "react"
import { useRequest } from "../../lib/apiClient/hooks"
import { AuthUser, useLiff } from "../../provider/LiffProvider"
import sendInviteMessage from "../../service/sendInviteMessage"
import { OwnedBook } from "../../types/models"
import Card from "../base/Card"
import InviteCodeModal from "../template/modal/InviteCodeModal"
const LIFF_URL = process.env.NEXT_PUBLIC_LIFF_URL || ""

export type InviteCardProps = {
  ownedBook: OwnedBook
  authUser: AuthUser
}

const InviteCard: React.VFC<InviteCardProps> = ({ ownedBook, authUser }) => {
  const { post } = useRequest()
  const liff = useLiff()

  const [openInviteCodeModal, setInviteCodeModal] = useState(false)

  const handleInviteWithLine = async () => {
    const { inviteCode } = await post(
      { url: "/book/{bookId}/collaborators/invite-code", params: { bookId: ownedBook.book.id } },
      { role: "viewer" },
    )
    if (liff == null) {
      window.alert("エラーが発生しました。時間を空けて再度お試しください")
      return
    }
    const inviteUrl = `${LIFF_URL}/book/${ownedBook.book.id}/invited?code=${inviteCode}`
    console.log(inviteUrl)
    await sendInviteMessage(liff, authUser, ownedBook.book, inviteUrl)
  }

  return (
    <>
      <Card className="space-y-2">
        <h2 className="text-sm text-gray-500">友達を招待する</h2>
        <div className="flex space-x-2">
          <button
            className="flex-1 w-full py-1 text-sm border-2 rounded border-primary/80 text-primary"
            onClick={handleInviteWithLine}
          >
            LINEで招待
          </button>
          <button
            className="flex-1 w-full py-1 text-sm border-2 rounded border-primary/80 text-primary"
            onClick={() => setInviteCodeModal(true)}
          >
            URLで招待
          </button>
        </div>
      </Card>
      <InviteCodeModal
        open={openInviteCodeModal}
        onClose={() => setInviteCodeModal(false)}
        ownedBook={ownedBook}
        authUser={authUser}
      />
    </>
  )
}

export default InviteCard
