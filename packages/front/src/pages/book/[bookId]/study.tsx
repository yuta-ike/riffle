import { GetServerSideProps, NextPage } from "next"
import React, { useCallback, useRef, useState } from "react"
import Title from "../../../view/base/typography/Title"
import Thumbnail from "../../../view/model/category/Thumbnail"
import Button from "../../../view/components/Button"
import { OwnedBook, Word } from "../../../types/models"
import WordStudyScreen from "../../../view/template/WordStudyScreen"
import WordStudyCompleteScreen from "../../../view/template/WordStudyCompleteScreen"
import { useRouter } from "next/dist/client/router"
import IconButton from "../../../view/base/IconButton"
import { X as Cross } from "react-feather"
import SelectButton from "../../../view/components/SelectButton"
import { verifyIdToken } from "../../../lib/firebaseAdmin/auth"
import { apiClient } from "../../../lib/apiClient"
import { useApiSWR } from "../../../lib/apiClient/hooks"
const BOOK = {
  id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  title: "教科書第2章 新出単語",
  category: "english",
  description: "教科書第2章の本文中に出てくる新出単語をまとめました",
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
                iconUrl:
                  "https://www.newsweekjapan.jp/stories/assets_c/2020/10/istock-978803352a-thumb-720xauto-218530.jpeg",
              },
              createdAt: "2021-08-25T14:15:22Z",
            },
            {
              id: 2,
              stampType: "heart",
              author: {
                id: "user-id-2",
                name: "田中太郎",
                iconUrl:
                  "https://www.newsweekjapan.jp/stories/assets_c/2020/10/istock-978803352a-thumb-720xauto-218530.jpeg",
              },
              createdAt: "2021-08-25T18:15:22Z",
            },
          ],
        },
        {
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
                iconUrl:
                  "https://www.newsweekjapan.jp/stories/assets_c/2020/10/istock-978803352a-thumb-720xauto-218530.jpeg",
              },
              createdAt: "2021-08-25T14:15:22Z",
            },
            {
              id: 2,
              stampType: "heart",
              author: {
                id: "user-id-2",
                name: "田中太郎",
                iconUrl:
                  "https://www.newsweekjapan.jp/stories/assets_c/2020/10/istock-978803352a-thumb-720xauto-218530.jpeg",
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
        iconUrl: "https://www.newsweekjapan.jp/stories/assets_c/2020/10/iStock-978803352a-thumb-720xauto-218530.jpeg",
      },
      done: true,
      flags: [0, 1],
    },
    {
      id: 2,
      order: 2,
      question: "beautiful",
      answer: "美しい",
      comments: [],
      createdAt: "2021-08-20T14:15:22Z",
      updatedAt: "2021-08-20T14:30:22Z",
      author: {
        id: "user-id",
        name: "john-doe",
        iconUrl: "https://www.newsweekjapan.jp/stories/assets_c/2020/10/iStock-978803352a-thumb-720xauto-218530.jpeg",
      },
      done: true,
      flags: [0, 1],
    },
    {
      id: 3,
      order: 3,
      question: "wonderful",
      answer: "素晴らしい",
      comments: [],
      createdAt: "2021-08-20T14:15:22Z",
      updatedAt: "2021-08-20T14:30:22Z",
      author: {
        id: "user-id",
        name: "john-doe",
        iconUrl: "https://www.newsweekjapan.jp/stories/assets_c/2020/10/iStock-978803352a-thumb-720xauto-218530.jpeg",
      },
      done: true,
      flags: [0, 1],
    },
  ],
  comments: [],
  author: {
    id: "user-id",
    name: "john-doe",
    iconUrl: "https://www.newsweekjapan.jp/stories/assets_c/2020/10/istock-978803352a-thumb-720xauto-218530.jpeg",
  },
  createdAt: "2021-08-20T14:15:22Z",
  updatedAt: "2021-08-20T14:20:22Z",
  collaborators: [
    {
      id: 2,
      user: {
        id: "user-id-2",
        name: "田中太郎",
        iconUrl: "https://www.newsweekjapan.jp/stories/assets_c/2020/10/iStock-978803352a-thumb-720xauto-218530.jpeg",
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

const INCLUDE_WORDS_TYPE = [
  { value: "all", label: "全て" },
  { value: "notDone", label: "未習得" },
] as const

const WORD_NUM = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "all", label: "全て" },
] as const

const ORDER = [
  { value: "order", label: "順番どおり" },
  { value: "random", label: "ランダム" },
] as const

export type StudyProps = {
  bookId: number
  ownedBook?: OwnedBook
}

const Study: NextPage<StudyProps> = ({ bookId, ownedBook: initOwnedBook }) => {
  const router = useRouter()

  const { data: ownedBookData } = useApiSWR(
    { url: "/owned-book/{bookId}", params: { bookId } },
    initOwnedBook != null ? { ownedBook: initOwnedBook } : undefined,
  )

  const [selectedIncludeWordType, setSelectedIncludeWordType] = useState<typeof INCLUDE_WORDS_TYPE[number]["value"]>(
    INCLUDE_WORDS_TYPE[0].value,
  )
  const [selectedWordNum, setSelectedWordNum] = useState<typeof WORD_NUM[number]["value"]>(WORD_NUM[0].value)
  const [selectedOrder, setSelectedOrder] = useState<typeof ORDER[number]["value"]>(ORDER[0].value)

  const [studyWords, setStudyWords] = useState<null | Word[]>(null)
  const [score, setScore] = useState<Record<number, boolean>>({})
  const [index, setIndex] = useState(0)

  const handleStart = useCallback(() => {
    if (ownedBookData == null) {
      return
    }
    // TODO: 単語の並び替えなど
    setStudyWords(ownedBookData.ownedBook.book.words)
  }, [])

  const handleAgain = useCallback(() => {
    setStudyWords(null)
  }, [])

  const handleFinish = useCallback(() => {
    router.push(`/book/${bookId}`)
  }, [])

  const result = useRef<Record<number, boolean>>({})

  if (ownedBookData?.ownedBook == null) {
    return null
  }

  const ownedBook = ownedBookData.ownedBook

  return (
    <article className="w-full min-h-screen p-4 bg-gray-50/50">
      {/* header */}
      <div className="flex space-x-4">
        <Thumbnail size="medium" category={ownedBook.book.category} className="flex-shrink-0">
          {ownedBook.book.title?.[0] ?? ""}
        </Thumbnail>
        <div className="flex items-center justify-between w-full">
          <Title>{ownedBook.book.title}</Title>
        </div>
        <IconButton label="戻る" onClick={() => router.push(`/book/${router.query.bookId}`)}>
          <Cross />
        </IconButton>
      </div>
      {/* WordStudyScreen */}
      {studyWords?.[index] != null && (
        <WordStudyScreen
          key={studyWords[index]?.id}
          ownedBook={ownedBook}
          word={studyWords[index] as Word}
          onNext={(done: boolean) => {
            setIndex((prev) => prev + 1)
            result.current[studyWords[index]?.id as number] = done
          }}
          className="mt-8"
        />
      )}
      {/* Result */}
      {studyWords != null && studyWords[index] == null && (
        <WordStudyCompleteScreen
          words={studyWords}
          result={result.current}
          score={Object.fromEntries(
            studyWords.map((word) => [word.id, score[word.id] ?? result.current[word.id] ?? false]),
          )}
          onClickCheck={(wordId) => {
            console.log(wordId)
            setScore((prev) => ({ ...prev, [wordId]: prev[wordId] != null ? !prev[wordId] : !result.current[wordId] }))
          }}
          onClickAgain={handleAgain}
          onClickFinish={handleFinish}
        />
      )}
      {/* Option */}
      {studyWords == null && (
        <div className="flex flex-col w-full mt-6 space-y-8 max-w-[280px] mx-auto">
          <FormSection label="含める単語">
            {INCLUDE_WORDS_TYPE.map(({ value, label }, index) => (
              <SelectButton
                key={value}
                isFirst={index === 0}
                isLast={index === INCLUDE_WORDS_TYPE.length - 1}
                selected={selectedIncludeWordType === value}
                onClick={() => setSelectedIncludeWordType(value)}
              >
                {label}
              </SelectButton>
            ))}
          </FormSection>
          <FormSection label="出題数">
            {WORD_NUM.map(({ value, label }, index) => (
              <SelectButton
                key={value}
                isFirst={index === 0}
                isLast={index === WORD_NUM.length - 1}
                selected={selectedWordNum === value}
                onClick={() => setSelectedWordNum(value)}
              >
                {label}
              </SelectButton>
            ))}
          </FormSection>
          <FormSection label="出題順序">
            {ORDER.map(({ value, label }, index) => (
              <SelectButton
                key={value}
                isFirst={index === 0}
                isLast={index === ORDER.length - 1}
                selected={selectedOrder === value}
                onClick={() => setSelectedOrder(value)}
              >
                {label}
              </SelectButton>
            ))}
          </FormSection>
          <div>
            <Button onClick={handleStart} fullWidth>
              スタート
            </Button>
          </div>
        </div>
      )}
    </article>
  )
}

export default Study

const FormSection: React.VFC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col items-center w-full space-y-2">
    <h1 className="self-start font-bold">{label}</h1>
    <div className="flex w-full">{children}</div>
  </div>
)

export const getServerSideProps: GetServerSideProps<StudyProps> = async (req) => {
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
