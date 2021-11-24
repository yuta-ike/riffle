import React, { useState } from "react"
import { GetServerSideProps, NextPage } from "next"
import c from "classnames"
import { apiClient } from "../../../lib/apiClient"
import { verifyIdToken } from "../../../lib/firebaseAdmin/auth"
import { OwnedBook, Word } from "../../../types/models"
import HeaderCard from "../../../view/base/HeaderCard"
import Thumbnail from "../../../view/model/category/Thumbnail"
import { useApiSWR, useRequest } from "../../../lib/apiClient/hooks"
import BottomSheet from "../../../view/base/BottomSheet"
import OutlineButton from "../../../view/base/OutlineButton"
import Card from "../../../view/base/Card"
import WordInput from "../../../view/model/word/WordInput"
import { Plus } from "react-feather"
import { useSWRConfig } from "swr"
import { useRouter } from "next/dist/client/router"
import { useModal } from "../../../provider/ModalProvider"

export type BookEditProps = {
  bookId: number
  ownedBook?: OwnedBook
}

const EditBook: NextPage<BookEditProps> = ({ bookId, ownedBook: initOwnedBook }) => {
  const router = useRouter()

  const { data: ownedBookData } = useApiSWR(
    { url: "/owned-book/{bookId}", params: { bookId } },
    initOwnedBook != null ? { ownedBook: initOwnedBook } : undefined,
  )

  if (ownedBookData?.ownedBook == null) {
    return null
  }

  const book = ownedBookData.ownedBook.book

  return (
    <>
      <HeaderCard className="fixed inset-x-0 top-0">
        <div className="flex items-center w-full space-x-2">
          <Thumbnail category={book.category} size="medium">
            {book.title?.[0] ?? ""}
          </Thumbnail>
          <p className="leading-none">{book.title}</p>
        </div>
      </HeaderCard>
      <article className="flex flex-col w-full p-4 space-y-4">
        <h2 className="font-bold tracking-wider text-gray-500">新規単語</h2>
        <WordCreateCard ownedBook={ownedBookData.ownedBook} />
        <hr />
        <h2 className="font-bold tracking-wider text-gray-500">単語の編集</h2>
        {book.words.map((word) => (
          <WordEditCard key={word.id} ownedBook={ownedBookData.ownedBook} word={word} />
        ))}
      </article>
      <BottomSheet>
        <OutlineButton href={`/book/${router.query.bookId}`} color="gray" className="w-[80px]">
          戻る
        </OutlineButton>
      </BottomSheet>
    </>
  )
}

export default EditBook

const WordEditCard: React.VFC<{ ownedBook: OwnedBook; word: Word }> = ({ ownedBook, word }) => {
  const { show } = useModal()
  const [question, setQuestion] = useState(word.question)
  const [answer, setAnswer] = useState(word.answer)
  const { mutate } = useSWRConfig()
  const { put, deleteRequest } = useRequest()

  const isEditted = question !== word.question || answer !== word.answer

  const reset = () => {
    setQuestion(word.question)
    setAnswer(word.answer)
  }

  const putWord = async () => {
    await put(
      { url: "/book/{bookId}/word/{wordId}", params: { bookId: ownedBook.book.id, wordId: word.id } },
      { question, answer },
    )
    mutate(`/owned-book/${ownedBook.id}`)
  }

  const deleteWord = async () => {
    const res = await show<boolean>("confirm", "本当に削除しますか？")
    if (!res) {
      return
    }
    await deleteRequest({ url: "/book/{bookId}/word/{wordId}", params: { bookId: ownedBook.book.id, wordId: word.id } })
    mutate(`/owned-book/${ownedBook.id}`)
  }

  return (
    <Card className={c("flex flex-col", isEditted && "border-primary")}>
      <WordInput
        className="flex-shrink-0"
        question={question}
        answer={answer}
        onChangeQuestion={setQuestion}
        onChangeAnswer={setAnswer}
        onClickDelete={deleteWord}
      />

      {isEditted && (
        <div className="flex justify-center w-full px-8 mt-4 space-x-4">
          <OutlineButton onClick={reset} size="small" color="gray" fullWidth>
            元に戻す
          </OutlineButton>
          <OutlineButton onClick={() => putWord()} size="small" fullWidth>
            保存
          </OutlineButton>
        </div>
      )}
    </Card>
  )
}

export const WordCreateCard: React.VFC<{ ownedBook: OwnedBook }> = ({ ownedBook }) => {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const { post } = useRequest()
  const { mutate } = useSWRConfig()

  const postWord = async () => {
    await post({ url: "/book/{bookId}/word", params: { bookId: ownedBook.book.id } }, { question, answer })
    mutate(`/owned-book/${ownedBook.id}`)
    setQuestion("")
    setAnswer("")
  }

  return (
    <Card className="flex flex-col">
      <WordInput
        className="flex-shrink-0 w-full"
        question={question}
        answer={answer}
        onChangeQuestion={setQuestion}
        onChangeAnswer={setAnswer}
      />
      {(question.length > 0 || answer.length > 0) && (
        <div className="flex justify-center w-full px-10 mt-4 space-x-4">
          <OutlineButton
            onClick={postWord}
            size="small"
            fullWidth
            disabled={question.length === 0 || answer.length === 0}
          >
            保存
          </OutlineButton>
        </div>
      )}
    </Card>
  )
}

export const getServerSideProps: GetServerSideProps<BookEditProps> = async (req) => {
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
