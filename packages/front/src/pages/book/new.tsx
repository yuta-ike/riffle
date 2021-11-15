import React, { useCallback, useState } from "react"
import { NextPage } from "next"
import c from "classnames"
import { CATEGORIES } from "../../constants/category"
import Card from "../../view/base/Card"
import Input from "../../view/base/Input"
import CATEGORY_COLORS from "../../view/constants/categoryColor"
import { Category } from "../../types/models"
import HeaderCard from "../../view/base/HeaderCard"
import Thumbnail from "../../view/model/category/Thumbnail"
import { Plus } from "react-feather"
import BottomSheet from "../../view/base/BottomSheet"
import { apiClient } from "../../lib/apiClient"
import { useRequest } from "../../lib/apiClient/hooks"
import { useModal } from "../../provider/ModalProvider"
import { useRouter } from "next/dist/client/router"

const NewBook: NextPage = () => {
  const { post } = useRequest()
  const router = useRouter()
  const [page, setPage] = useState(0)
  const { show } = useModal()

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<Category | null>(null)

  const [words, setWords] = useState<{ question: string; answer: string }[]>([
    { question: "", answer: "" },
    { question: "", answer: "" },
  ])

  const handleGoToNextPage = useCallback(() => {
    setPage(1)
  }, [])

  const canSubmit =
    title.length > 0 &&
    category != null &&
    words.filter(({ question, answer }) => question !== "" && answer !== "").length > 0

  const handleSubmit = async () => {
    if (category == null) return
    const { ownedBook } = await post("/owned-book", {
      title,
      category,
      words,
      accessLevel: "full",
    })
    await show("単語帳が追加されました!!")
    router.push(`/book/${ownedBook?.id ?? ""}`)
  }

  return (
    <>
      <HeaderCard className="fixed inset-x-0 top-0">
        <div className="flex items-center w-full space-x-2">
          <Thumbnail category={category} size="medium">
            {title.length === 0 ? "新" : title[0] ?? ""}
          </Thumbnail>
          <p className="leading-none">{title.length === 0 ? "新規単語帳" : title}</p>
        </div>
      </HeaderCard>

      {page === 0 && (
        <article className="flex flex-col items-center justify-start min-h-screen p-4 space-y-8 bg-gray-50">
          <Card className="flex flex-col space-y-8">
            <div className="space-y-2">
              <h2>単語帳の名前</h2>
              <Input value={title} onChange={setTitle} />
            </div>
            <div className="space-y-2">
              <h2>カテゴリ</h2>
              <div className="flex flex-wrap">
                {CATEGORIES.map(({ value, label }) => (
                  <button
                    key={value}
                    className="px-2 py-0.5 m-1 font-bold text-white rounded bg-gray-300"
                    style={{ backgroundColor: category === value ? CATEGORY_COLORS[value] : undefined }}
                    onClick={() => setCategory(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </Card>
          <div>
            <button
              className="flex-1 w-full px-4 py-2 text-sm border-2 rounded border-primary/80 text-primary disabled:border-gray-200 disabled:text-gray-300"
              disabled={title.length === 0 || category == null}
              onClick={handleGoToNextPage}
            >
              次へ
            </button>
          </div>
        </article>
      )}
      {page === 1 && (
        <article className="flex flex-col items-center justify-start min-h-screen p-4 space-y-4 bg-gray-50">
          {words.map(({ question, answer }, index) => (
            <Card key={index} className="w-full">
              <div className="flex space-x-3">
                <p className="flex-shrink-0 text-xl font-bold text-blue-500">Q</p>
                <Input
                  value={question}
                  onChange={(value) =>
                    setWords((prev) => {
                      const newWords = [...prev]
                      newWords[index]!.question = value
                      return newWords
                    })
                  }
                  multi
                  minRows={2}
                />
              </div>
              <hr className="my-2" />
              <div className="flex space-x-3">
                <p className="flex-shrink-0 text-xl font-bold text-red-500">A</p>
                <Input
                  value={answer}
                  onChange={(value) =>
                    setWords((prev) => {
                      const newWords = [...prev]
                      newWords[index]!.answer = value
                      return newWords
                    })
                  }
                  multi
                  minRows={2}
                />
              </div>
            </Card>
          ))}
          <div className="pt-4">
            <button
              className="p-2 border-2 border-solid rounded-full border-primary/80 text-primary"
              aria-label="カードを追加する"
              onClick={() => setWords((prev) => [...prev, { question: "", answer: "" }])}
            >
              <Plus stroke="rgba(65, 105, 225, 0.8)" strokeWidth={2} />
            </button>
          </div>
          <BottomSheet className="p-4 bg-gray-50">
            <div className="flex w-full space-x-2">
              <button
                className="w-[100px] p-2 text-gray-500 border-2 border-gray-500 border-solid rounded"
                onClick={() => setPage(0)}
              >
                戻る
              </button>
              <button
                className="w-full p-2 border-2 border-solid rounded border-primary/80 text-primary disabled:text-gray-300 disabled:border-gray-200"
                onClick={handleSubmit}
                disabled={!canSubmit}
              >
                完了する
              </button>
            </div>
          </BottomSheet>
        </article>
      )}
    </>
  )
}

export default NewBook
