import React, { useCallback, useState } from "react"
import { NextPage } from "next"
import { CATEGORIES } from "../../constants/category"
import Card from "../../view/base/Card"
import Input from "../../view/base/Input"
import CATEGORY_COLORS from "../../view/constants/categoryColor"
import { Category } from "../../types/models"
import HeaderCard from "../../view/base/HeaderCard"
import Thumbnail from "../../view/model/category/Thumbnail"
import { useRequest } from "../../lib/apiClient/hooks"
import { useModal } from "../../provider/ModalProvider"
import { useRouter } from "next/dist/client/router"
import WordsAddScreen from "../../view/template/newBook/WordsAddScreen"

const NewBook: NextPage = () => {
  const { post } = useRequest()
  const router = useRouter()
  const [page, setPage] = useState(0)
  const { show } = useModal()

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<Category | null>(null)

  const handleGoToNextPage = useCallback(() => {
    setPage(1)
  }, [])

  const handleSubmit = async (words: { question: string; answer: string }[]) => {
    if (title.length === 0 || category == null) return
    const { ownedBook } = await post("/owned-book", {
      title,
      category,
      words,
      accessLevel: "full",
    })
    await show("complete", "単語帳が追加されました!!")
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
      {page === 1 && <WordsAddScreen onClickSubmit={handleSubmit} onClickBack={() => setPage(0)} />}
    </>
  )
}

export default NewBook
