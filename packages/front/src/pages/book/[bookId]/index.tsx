import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/dist/client/router"
import React, { useCallback, useState } from "react"
import { BookOpen, Plus } from "react-feather"
import { apiClient } from "../../../lib/apiClient"
import { useApiSWR, useRequest } from "../../../lib/apiClient/hooks"
import { Book, CommentType, OwnedBook, Word } from "../../../types/models"
import Card from "../../../view/base/Card"
import Fab from "../../../view/base/FAB"
import CircleImage from "../../../view/components/CircleImage"
import CommentForm from "../../../view/components/CommentForm"
import BookHeader from "../../../view/model/book/BookHeader"
import CollaboratorCard from "../../../view/model/collaborator/CollaboratorCard"
import CommentColumn from "../../../view/model/comment/CommentColumn"
import WordCard from "../../../view/model/word/WordCard"
import WordScoreCard from "../../../view/model/word/WordScoreCard"
import nookies from "nookies"
import { verifyIdToken } from "../../../lib/firebaseAdmin/auth"
import { useSWRConfig } from "swr"
import sendInviteMessage from "../../../service/sendInviteMessage"
import { AuthUser, useAuthUser, useLiff } from "../../../provider/LiffProvider"

const BOOK = {
  id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  title: "教科書第2章 新出単語",
  category: "english",
  description: "教科書第2章の本文中に出てくる新出単語をまとめました",
  comments: [
    {
      id: "1",
      content: "サンプルコメント",
      commentType: "default",
      author: {
        id: "user-id",
        name: "john-doe",
        iconUrl: "https://pbs.twimg.com/profile_images/1260451774932156418/9D6Br_B6_x96.jpg",
      },
      createdAt: "2021-08-24T14:15:22Z",
      stamps: [
        {
          id: 1,
          stampType: "thumbup",
          author: {
            id: "user-id",
            name: "john-doe",
            iconUrl: "https://pbs.twimg.com/profile_images/1260451774932156418/9D6Br_B6_x96.jpg",
          },
          createdAt: "2021-08-25T14:15:22Z",
        },
        {
          id: 2,
          stampType: "heart",
          author: {
            id: "user-id-2",
            name: "田中太郎",
            iconUrl: "https://pbs.twimg.com/profile_images/1260451774932156418/9D6Br_B6_x96.jpg",
          },
          createdAt: "2021-08-25T18:15:22Z",
        },
      ],
    },
  ],
  words: [
    {
      id: 1,
      order: 1,
      question: "traditional",
      answer: "伝統的な",
      comments: [
        {
          id: "1",
          content: "サンプルコメント",
          commentType: "default",
          author: {
            id: "user-id",
            name: "john-doe",
            iconUrl: "https://pbs.twimg.com/profile_images/1260451774932156418/9D6Br_B6_x96.jpg",
          },
          createdAt: "2021-08-24T14:15:22Z",
          stamps: [
            {
              id: 1,
              stampType: "thumbup",
              author: {
                id: "user-id",
                name: "john-doe",
                iconUrl: "https://pbs.twimg.com/profile_images/1260451774932156418/9D6Br_B6_x96.jpg",
              },
              createdAt: "2021-08-25T14:15:22Z",
            },
            {
              id: 2,
              stampType: "heart",
              author: {
                id: "user-id-2",
                name: "田中太郎",
                iconUrl: "https://pbs.twimg.com/profile_images/1260451774932156418/9D6Br_B6_x96.jpg",
              },
              createdAt: "2021-08-25T18:15:22Z",
            },
          ],
        },
      ],
      createdAt: "2021-08-20T14:15:22Z",
      updatedAt: "2021-08-20T14:30:22Z",
      author: {
        id: "user-id",
        name: "john-doe",
        iconUrl: "https://pbs.twimg.com/profile_images/1260451774932156418/9D6Br_B6_x96.jpg",
      },
      done: true,
      flags: [0, 1],
    },
  ],
  author: {
    id: "user-id",
    name: "john-doe",
    iconUrl: "https://pbs.twimg.com/profile_images/1260451774932156418/9D6Br_B6_x96.jpg",
  },
  createdAt: "2021-08-20T14:15:22Z",
  updatedAt: "2021-08-20T14:20:22Z",
  collaborators: [
    {
      id: 2,
      user: {
        id: "user-id-2",
        name: "田中太郎",
        iconUrl: "https://pbs.twimg.com/profile_images/1260451774932156418/9D6Br_B6_x96.jpg",
      },
      joinDate: "2021-08-27T14:15:22Z",
      requestDate: "2021-08-25T14:15:22Z",
      role: "editor",
    },
  ],
  wordScores: [
    {
      id: 1,
      wordId: 1,
      result: true,
      createdAt: "2019-08-24T14:15:22Z",
    },
  ],
} as const

const USER = {
  id: "user-id",
  name: "john-doe",
  iconUrl: "https://pbs.twimg.com/profile_images/1260451774932156418/9D6Br_B6_x96.jpg",
}

const TABS = [
  // { value: "home", label: "ホーム" },
  { value: "cards", label: "カード" },
  { value: "comment", label: "フォーラム" },
  { value: "score", label: "きろく" },
  { value: "friends", label: "ともだち" },
] as const

const LIFF_URL = process.env.NEXT_PUBLIC_LIFF_URL || ""

export type Tab = typeof TABS[number]["value"]

export type BookDetailProps = {
  bookId: number
  ownedBook?: OwnedBook
}

const BookDetail: NextPage<BookDetailProps & { authUser: AuthUser }> = ({
  bookId,
  ownedBook: initOwnedBook,
  authUser,
}) => {
  const router = useRouter()
  const liff = useLiff()
  const [tab, setTab] = useState<Tab>(TABS[0].value)
  const { post } = useRequest()
  const { data: ownedBookData } = useApiSWR(
    { url: "/owned-book/{bookId}", params: { bookId } },
    initOwnedBook != null ? { ownedBook: initOwnedBook } : undefined,
  )
  const { mutate } = useSWRConfig()

  const handleClickFavorite = useCallback(() => {
    console.log("favorite")
  }, [])

  const handleClickStudy = useCallback(() => {
    router.push(`/book/${router.query.bookId}/study`)
  }, [])

  if (ownedBookData?.ownedBook == null) {
    return null
  }

  const handleSendComment = async (type: CommentType, content: string) => {
    await post(
      { url: "/book/{bookId}/comment", params: { bookId: ownedBookData.ownedBook.book.id } },
      {
        content,
        type,
      },
    )
    mutate(`/owned-book/${ownedBookData.ownedBook.id}`)
  }

  const handleInviteWithLine = async () => {
    const { inviteCode } = await post(
      { url: "/book/{bookId}/collaborators/invite-code", params: { bookId: ownedBookData.ownedBook.book.id } },
      { role: "viewer" },
    )
    if (liff == null) {
      window.alert("エラーが発生しました。時間を空けて再度お試しください")
      return
    }
    const inviteUrl = `${LIFF_URL}/book/${ownedBookData.ownedBook.book.id}/invited?code=${inviteCode}`
    console.log(inviteUrl)
    await sendInviteMessage(liff, authUser, ownedBookData.ownedBook.book, inviteUrl)
  }

  return (
    <>
      <article>
        <BookHeader<Tab>
          ownedBook={ownedBookData.ownedBook}
          selectedTab={tab}
          onClickTab={setTab}
          tabs={TABS}
          onClickFavorite={handleClickFavorite}
          onClickStudy={handleClickStudy}
        />
        <div className="flex flex-col p-4 space-y-4">
          {tab === "cards" && (
            <>
              <Card className="flex items-center space-x-2">
                <h2 className="w-full text-sm text-gray-500">カードを追加する</h2>
                <button className="flex items-center flex-shrink-0 px-2 py-1 space-x-1 text-sm border-2 rounded border-primary/80 text-primary">
                  <Plus size="16px" stroke="rgba(65, 105, 225, 0.8)" strokeWidth={3} />
                  追加
                </button>
              </Card>
              {ownedBookData.ownedBook.book.words.map((word) => (
                <WordCard key={word.id} ownedBook={ownedBookData.ownedBook} word={word} />
              ))}
            </>
          )}
          {tab === "comment" && (
            <>
              {ownedBookData.ownedBook.book.comments.map((comment, index) => (
                <div key={comment.id}>
                  {index === 0 ||
                  new Date(comment.createdAt).toDateString() !==
                    new Date(BOOK.wordScores[index - 1]?.createdAt ?? "").toDateString() ? (
                    <div className="w-full my-2">
                      <p className="text-sm text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()} (
                        {["日", "月", "火", "水", "木", "金", "土"][new Date(comment.createdAt).getDay()]})
                      </p>
                      <hr />
                    </div>
                  ) : null}
                  <CommentColumn comment={comment} />
                </div>
              ))}
              <CommentForm onSend={handleSendComment} minRows={2} />
            </>
          )}
          {tab === "score" &&
            ownedBookData.ownedBook.book.wordScores?.map((wordScore, index) => (
              <div key={wordScore.id}>
                {index === 0 ||
                new Date(wordScore.createdAt).toDateString() !==
                  new Date(BOOK.wordScores[index - 1]?.createdAt ?? "").toDateString() ? (
                  <div className="w-full my-4">
                    <p className="text-sm text-gray-400">
                      {new Date(wordScore.createdAt).toLocaleDateString()} (
                      {["日", "月", "火", "水", "木", "金", "土"][new Date(wordScore.createdAt).getDay()]})
                    </p>
                    <hr />
                  </div>
                ) : null}
                <WordScoreCard
                  word={BOOK.words.find(({ id }) => id === wordScore.wordId) as unknown as Word}
                  wordScore={wordScore}
                  onClickCheck={console.log}
                />
              </div>
            ))}
          {tab === "friends" && (
            <div className="space-y-4">
              <div className="space-y-4">
                <Card className="space-y-2">
                  <h2 className="text-sm text-gray-500">友達を招待する</h2>
                  <div className="flex space-x-2">
                    <button
                      className="flex-1 w-full py-1 text-sm border-2 rounded border-primary/80 text-primary"
                      onClick={handleInviteWithLine}
                    >
                      LINEで招待
                    </button>
                    <button className="flex-1 w-full py-1 text-sm border-2 rounded border-primary/80 text-primary">
                      URLで招待
                    </button>
                  </div>
                </Card>
                <Card className="space-y-3">
                  <h2 className="text-sm text-gray-500">参加リクエスト中のユーザー</h2>
                  {/* TODO: dummy */}
                  {[USER].map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2" key={user.id}>
                        <CircleImage url={user.iconUrl} alt="" size="small" className="flex-shrink-0" />
                        <div>
                          <p className="">{user.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div>x</div>
                        <div>o</div>
                      </div>
                    </div>
                  ))}
                </Card>
                <Card className="space-y-3">
                  <h2 className="text-sm text-gray-500">招待中のユーザー</h2>
                  {/* TODO: dummy */}
                  {[USER].map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2" key={user.id}>
                        <CircleImage url={user.iconUrl} alt="" size="small" className="flex-shrink-0" />
                        <div>
                          <p className="">{user.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">キャンセル</div>
                    </div>
                  ))}
                </Card>
              </div>
              <hr />
              {ownedBookData.ownedBook.book.collaborators.map((collaborator) => (
                <CollaboratorCard
                  key={collaborator.id}
                  collaborator={collaborator}
                  onChangeRole={console.log}
                  onClickKick={console.log}
                />
              ))}
            </div>
          )}
        </div>
      </article>
      {tab !== "comment" && (
        <Fab onClick={handleClickStudy}>
          <div className="flex items-center space-x-2">
            <BookOpen stroke="white" />
            <p className="flex-shrink-0 leading-none text-white">勉強する</p>
          </div>
        </Fab>
      )}
    </>
  )
}

export default BookDetail

export const getServerSideProps: GetServerSideProps<BookDetailProps> = async (req) => {
  const bookId = parseInt(req.query.bookId as string, 10)

  if (Number.isNaN(bookId)) {
    return {
      notFound: true,
    }
  }

  const token = await verifyIdToken(req)

  if (token == null) {
    return {
      props: {
        bookId,
      },
    }
  }

  const {
    data: { ownedBook },
  } = await apiClient().get({ url: "/owned-book/{bookId}", params: { bookId } }, { authorization: `Bearer ${token}` })

  return {
    props: {
      bookId,
      ownedBook,
    },
  }
}
