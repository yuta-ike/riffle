import React from "react"
import { GetServerSideProps, NextPage } from "next"
import useSWR from "swr"
import { apiClient } from "../lib/apiClient"
import { verifyIdToken } from "../lib/firebaseAdmin/auth"
import { BookSummary, User } from "../types/models"
import Card from "../view/base/Card"
import Title from "../view/base/typography/Title"
import Thumbnail from "../view/model/category/Thumbnail"
import Loading from "../view/template/Loading"
import { useAuthUser } from "../provider/LiffProvider"
import CircleImage from "../view/components/CircleImage"
import OutlineButton from "../view/base/OutlineButton"
import { useRequest } from "../lib/apiClient/hooks"
import { useModal } from "../provider/ModalProvider"
import { useRouter } from "next/dist/client/router"
import Link from "next/link"

const useVerifyInviteCode = (
  inviteCode: string,
  fallbackData: { bookSummary: BookSummary; inviterUser: User; expired: boolean; deauthorized: boolean } | null,
) => {
  const authUser = useAuthUser()
  return useSWR(
    inviteCode != null || authUser == null ? ["POST/verify-invite-code", inviteCode] : null,
    async (_, inviteCode) => {
      const token = (await authUser?.token()) as string
      const res = await apiClient().post(
        "/verify-invite-code",
        {
          inviteCode,
        },
        { authorization: `Bearer ${token}` },
      )

      return res.data ?? null
    },
    {
      fallbackData,
    },
  )
}

export type InvitedPageProps = {
  inviteCode: string
  bookSummary: BookSummary | null
  inviterUser: User | null
  expired: boolean | null
  deauthorized: boolean | null
}

const InvitedPage: NextPage<InvitedPageProps> = ({ inviteCode, ...rest }) => {
  const router = useRouter()
  const { post } = useRequest()
  const { show } = useModal()
  const { data } = useVerifyInviteCode(
    inviteCode,
    rest.bookSummary == null || rest.inviterUser == null || rest.expired == null || rest.deauthorized == null
      ? null
      : {
          bookSummary: rest.bookSummary,
          inviterUser: rest.inviterUser,
          expired: rest.expired,
          deauthorized: rest.deauthorized,
        },
  )

  if (data == null) {
    return <Loading />
  }

  const handleAcceptInvite = async () => {
    await post(
      { url: "/book/{bookId}/collaborators/invited", params: { bookId: data.bookSummary.id } },
      {
        inviteCode,
        accept: true,
      },
    )
    router.push(`/`)
  }

  const handleDenyInvite = async () => {
    const res = await show("confirm", "本当に招待を断りますか？")
    if (!res) {
      return
    }
    await post(
      { url: "/book/{bookId}/collaborators/invited", params: { bookId: data.bookSummary.id } },
      {
        inviteCode,
        accept: false,
      },
    )
    router.push("/")
  }

  return (
    <article className="flex flex-col items-center h-screen p-4 bg-gray-50">
      <Card className="flex flex-col items-start w-full mt-16 space-y-4">
        {data.deauthorized ? (
          <>
            <h1 className="self-center font-bold">招待エラー</h1>
            <p className="text-sm">招待がキャンセルされたか、既に他のユーザーがこの招待URLを使用しました。</p>
            <Link href="/">
              <a className="self-center text-sm text-blue-500 underline">トップへ戻る</a>
            </Link>
          </>
        ) : data.expired ? (
          <>
            <h1 className="self-center font-bold">招待エラー</h1>
            <p className="text-sm">招待URLの有効期限が切れています。</p>
            <Link href="/">
              <a className="self-center text-sm text-blue-500 underline">トップへ戻る</a>
            </Link>
          </>
        ) : (
          <>
            <h1 className="self-center font-bold">招待されています</h1>
            <div className="flex w-full px-4 py-3 space-x-4 border border-gray-200 rounded-lg">
              <Thumbnail category={data.bookSummary.category} size="medium">
                {data.bookSummary.title?.[0] ?? ""}
              </Thumbnail>
              <div>
                <Title>{data.bookSummary.title}</Title>
                <p className="text-sm">
                  単語数: {data.bookSummary.wordCount} ユーザ数: {data.bookSummary.collaboratorCount}
                </p>
              </div>
            </div>
            <div className="flex items-center self-end">
              <p>by </p>
              <div className="flex items-center px-3 py-2 space-x-2 rounded-lg">
                <CircleImage url={data.inviterUser.iconUrl} size="small" />
                <p className="text-sm">{data.inviterUser.name}</p>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-center w-full space-x-2">
              <OutlineButton className="flex-1" onClick={handleDenyInvite} color="gray">
                辞退する
              </OutlineButton>
              <OutlineButton className="flex-1" onClick={handleAcceptInvite}>
                参加する
              </OutlineButton>
            </div>
          </>
        )}
      </Card>
    </article>
  )
}

export default InvitedPage

export const getServerSideProps: GetServerSideProps<InvitedPageProps> = async (req) => {
  const inviteCode = req.query.code as string

  if (inviteCode == null || typeof inviteCode !== "string") {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }

  const token = await verifyIdToken(req)
  if (token == null) {
    return {
      props: {
        inviteCode,
        bookSummary: null,
        inviterUser: null,
        expired: null,
        deauthorized: null,
      },
    }
  }

  const { data } = await apiClient().post("/verify-invite-code", { inviteCode }, { authorization: `Bearer ${token}` })

  return {
    props: {
      inviteCode,
      bookSummary: data.bookSummary,
      expired: data.expired,
      deauthorized: data.deauthorized,
      inviterUser: data.inviterUser,
    },
  }
}
