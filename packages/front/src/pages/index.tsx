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
              <p>未実装です{"><"}</p>
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
