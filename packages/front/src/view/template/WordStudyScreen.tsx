import React, { useState } from "react"
import c from "classnames"
import { Book, CommentType, OwnedBook, Word } from "../../types/models"
import Card from "../base/Card"
import Button from "../components/Button"
import CommentColumn from "../model/comment/CommentColumn"
import CommentForm from "../components/CommentForm"
import CheckIcon from "../components/CheckIcon"
import IconButton from "../base/IconButton"
import { useRequest } from "../../lib/apiClient/hooks"
import { useSWRConfig } from "swr"

export type WordStudyScreenProps = {
  ownedBook: OwnedBook
  word: Word
  onNext?: (done: boolean) => void
  className?: string
  disableInteraction?: boolean
}

const WordStudyScreen: React.VFC<WordStudyScreenProps> = ({
  ownedBook,
  word,
  onNext,
  className,
  disableInteraction = false,
}) => {
  const [showAnswer, setShowAnswer] = useState(false)
  const [done, setDone] = useState(false)
  const { post } = useRequest()
  const { mutate } = useSWRConfig()

  const handleSendComment = async (type: CommentType, content: string) => {
    await post(
      { url: "/book/{bookId}/word/{wordId}/comment", params: { bookId: ownedBook.book.id, wordId: word.id } },
      {
        content,
        type,
      },
    )
    mutate(`/owned-book/${ownedBook.id}`)
  }

  return (
    <>
      <div className={c(className, "space-y-8")}>
        <div className="px-4 bg-white rounded-lg shadow-main">
          <div className="h-[10em] py-4 flex items-center justify-center text-center text-lg">{word.question}</div>
          <hr />
          <div className="h-[10em] py-4 text-center text-lg flex flex-col relative">
            {disableInteraction || showAnswer ? (
              <>
                <button
                  onClick={() => onNext?.(done)}
                  className="relative flex items-center justify-center w-full h-full"
                  disabled={disableInteraction}
                >
                  {word.answer}
                </button>
                <div className="absolute top-0 right-0 mt-4">
                  <IconButton onClick={() => setDone((prev) => !prev)} label="DONE">
                    <CheckIcon done={done} />
                  </IconButton>
                </div>
              </>
            ) : (
              <button
                onClick={() => setShowAnswer(true)}
                className="flex items-center justify-center w-full h-full text-base text-gray-300 border border-gray-300 border-dashed rounded-lg"
              >
                タップで答えを見る
              </button>
            )}
          </div>
        </div>
        {/* TODO: 作成者 */}
        <div className="px-4 space-y-6">
          {word.comments.map((comment) => (
            <CommentColumn key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
      <CommentForm onSend={handleSendComment} />
    </>
  )
}

export default WordStudyScreen
