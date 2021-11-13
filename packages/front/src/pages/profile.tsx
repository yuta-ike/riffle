import { NextPage } from "next"
import Link from "next/link"
import React from "react"
import useSWR from "swr"
import { useApiClient } from "../provider/ApiClientProvider"
import { useAuthUser } from "../provider/LiffProvider"

const Test: NextPage = () => {
  const apiClient = useApiClient()
  const { data, error } = useSWR(apiClient.token == null ? null : "/owned-book", () => apiClient.get("/owned-book"))
  const authUser = useAuthUser()

  return (
    <div>
      <p>
        <Link href="/">
          <a>HOME</a>
        </Link>
      </p>
      <p>name: {authUser?.name}</p>
      <p>token: {authUser?.token}</p>
      {authUser?.iconUrl != null && <img width="400px" src={authUser?.iconUrl} alt="" />}
      <code>{JSON.stringify(data?.data)}</code>
      {data?.data.ownedBooks?.map((book) => (
        <p key={book.id}>{book.book.title}</p>
      ))}
    </div>
  )
}

export default Test
