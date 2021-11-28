import type { GetServerSideProps, NextPage } from "next"
import React, { useCallback, useState } from "react"
import BookCard from "../view/model/book/BookCard"
import MeetingBookCard from "../view/model/book/MeetingBookCard"
import CommentCard from "../view/model/comment/CommentCard"
import UserHeader from "../view/model/user/UserHeader"
import { useApiSWR } from "../lib/apiClient/hooks"
import { AuthUser } from "../provider/LiffProvider"
import Fab from "../view/base/FAB"
import { Plus } from "react-feather"
import { useRouter } from "next/dist/client/router"
import { verifyIdToken } from "../lib/firebaseAdmin/auth"
import { apiClient } from "../lib/apiClient"
import { OwnedBook } from "../types/models"
import Link from "next/link"

const TABS = [
  {
    value: "books",
    label: "単語帳",
  },
  {
    value: "activity",
    label: "アクティビティ",
  },
] as const

type Tab = typeof TABS[number]["value"]

export type HomeProps = {
  authUser: AuthUser
  ownedBooks?: OwnedBook[]
}

const Home: NextPage<HomeProps> = ({ authUser, ownedBooks: initOwnedBooks }) => {
  const [tab, setTab] = useState<Tab>("books")
  const { data: ownedBooksData } = useApiSWR(
    "/owned-book",
    initOwnedBooks != null ? { ownedBooks: initOwnedBooks } : undefined,
  )
  const router = useRouter()

  console.log(ownedBooksData)

  const onClickNewBook = useCallback(() => {
    router.push("/book/new")
  }, [router])

  return (
    <>
      <article>
        <UserHeader className="w-full" user={authUser} selectedTab={tab} onChangeTab={setTab} tabs={TABS} />
        <div className="px-4 mt-[30px] flex flex-col space-y-6">
          {tab === "books" &&
            ownedBooksData?.ownedBooks.map((ownedBook) => (
              <Link key={ownedBook.id} href={`/book/${ownedBook.id}`}>
                <a>
                  <BookCard ownedBook={ownedBook} />
                </a>
              </Link>
            ))}
          {tab === "activity" && (
            <>
              <CommentCard
                comment={{
                  id: "1",
                  content: "サンプルコメント",
                  commentType: "default",
                  author: {
                    id: "user-id",
                    name: "john-doe",
                    iconUrl:
                      "https://www.newsweekjapan.jp/stories/assets_c/2020/10/iStock-978803352a-thumb-720xauto-218530.jpeg",
                  },
                  createdAt: "2021-08-24T14:15:22Z",
                  stamps: [
                    {
                      id: 1,
                      stampType: "thumbup",
                      author: {
                        id: "user-id",
                        name: "john-doe",
                        iconUrl: "http://example.com/icon.png",
                      },
                      createdAt: "2021-08-25T14:15:22Z",
                    },
                    {
                      id: 2,
                      stampType: "heart",
                      author: {
                        id: "user-id-2",
                        name: "田中太郎",
                        iconUrl: "http://example.com/icon.png",
                      },
                      createdAt: "2021-08-25T18:15:22Z",
                    },
                  ],
                }}
                book={{
                  id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
                  title: "教科書第2章 新出単語",
                  category: "english",
                  description: "教科書第2章の本文中に出てくる新出単語をまとめました",
                  words: [],
                  comments: [],
                  author: {
                    id: "user-id",
                    name: "john-doe",
                    iconUrl: "http://example.com/icon.png",
                  },
                  createdAt: "2021-08-20T14:15:22Z",
                  updatedAt: "2021-08-20T14:20:22Z",
                  collaborators: [
                    {
                      id: 2,
                      user: {
                        id: "user-id-2",
                        name: "田中太郎",
                        iconUrl: "http://example.com/icon.png",
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
                }}
                word={{
                  id: 1,
                  order: 1,
                  question: "traditional",
                  answer: "伝統的な",
                  comments: [],
                  createdAt: "2021-08-20T14:15:22Z",
                  updatedAt: "2021-08-20T14:30:22Z",
                  author: {
                    id: "user-id",
                    name: "john-doe",
                    iconUrl: "http://example.com/icon.png",
                  },
                  done: true,
                  flags: [0, 1],
                }}
              />
              <MeetingBookCard
                ownedBook={{
                  id: 1,
                  lastUsedAt: "2021-08-20T14:15:22Z",
                  book: {
                    id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
                    title: "教科書第2章 新出単語",
                    category: "english",
                    description: "教科書第2章の本文中に出てくる新出単語をまとめました",
                    words: [],
                    comments: [],
                    author: {
                      id: "user-id",
                      name: "john-doe",
                      iconUrl: "http://example.com/icon.png",
                    },
                    createdAt: "2021-08-20T14:15:22Z",
                    updatedAt: "2021-08-20T14:20:22Z",
                    collaborators: [
                      {
                        id: 2,
                        user: {
                          id: "user-id-2",
                          name: "田中太郎",
                          iconUrl: "http://example.com/icon.png",
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
                  },
                  type: "own",
                  createdAt: "2021-08-24T14:15:22Z",
                  updatedAt: "2021-08-24T14:15:22Z",
                  isFavorite: true,
                  statistics: {
                    done: 8,
                  },
                  role: "owner",
                  accessLevel: "meta",
                }}
              />
              <BookCard
                ownedBook={{
                  id: 1,
                  lastUsedAt: "2021-08-20T14:15:22Z",
                  book: {
                    id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
                    title: "教科書第2章 新出単語",
                    category: "english",
                    description: "教科書第2章の本文中に出てくる新出単語をまとめました",
                    words: [],
                    comments: [],
                    author: {
                      id: "user-id",
                      name: "john-doe",
                      iconUrl: "http://example.com/icon.png",
                    },
                    createdAt: "2021-08-20T14:15:22Z",
                    updatedAt: "2021-08-20T14:20:22Z",
                    collaborators: [
                      {
                        id: 2,
                        user: {
                          id: "user-id-2",
                          name: "田中太郎",
                          iconUrl: "http://example.com/icon.png",
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
                  },
                  type: "own",
                  createdAt: "2021-08-24T14:15:22Z",
                  updatedAt: "2021-08-24T14:15:22Z",
                  isFavorite: true,
                  statistics: {
                    done: 8,
                  },
                  role: "owner",
                  accessLevel: "meta",
                }}
              />
            </>
          )}
        </div>
      </article>
      <Fab onClick={onClickNewBook}>
        <div className="flex items-center space-x-2">
          <Plus stroke="white" />
          <p className="flex-shrink-0 leading-none text-white">新しい単語帳</p>
        </div>
      </Fab>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (req) => {
  const token = await verifyIdToken(req)

  if (token == null) {
    return {
      props: {},
    }
  }

  const {
    data: { ownedBooks },
  } = await apiClient().get("/owned-book", { authorization: `Bearer ${token}` })

  return {
    props: {
      ownedBooks,
    },
  }
}
