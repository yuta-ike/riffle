import React from "react"
import { Word } from "../../types/models"
import BottomSheet from "../base/BottomSheet"
import Button from "../components/Button"
import WordScoreCard from "../model/word/WordScoreCard"

export type WordStudyCompleteScreenProps = {
  words: Word[]
  result: Record<number, boolean>
  score: Record<number, boolean>
  onClickCheck: (wordId: number) => void
  onClickFinish: () => void
  onClickAgain: () => void
}

const WordStudyCompleteScreen: React.VFC<WordStudyCompleteScreenProps> = ({
  words,
  result,
  score,
  onClickCheck,
  onClickFinish,
  onClickAgain,
}) => {
  return (
    <>
      <article className="px-4 py-8 space-y-4">
        <h1 className="w-full text-lg font-bold text-center">結果</h1>
        <div className="flex flex-col items-center w-full space-y-2">
          {words.map((word) => (
            <WordScoreCard
              key={word.id}
              word={word}
              wordScore={{
                id: word.id,
                createdAt: new Date().toISOString(),
                result: result[word.id] ?? false,
                wordId: word.id,
              }}
              className="w-full"
              overrideChecked={score?.[word.id] ?? false}
              onClickCheck={() => onClickCheck(word.id)}
            />
          ))}
        </div>
      </article>
      <BottomSheet>
        <div className="flex w-full space-x-2">
          <button
            className="w-[150px] p-2 text-gray-500 border-2 border-gray-500 border-solid rounded"
            onClick={onClickFinish}
          >
            終了
          </button>
          <button
            className="w-full p-2 border-2 border-solid rounded border-primary/80 text-primary disabled:text-gray-300 disabled:border-gray-200"
            onClick={onClickAgain}
          >
            もう一度
          </button>
        </div>
      </BottomSheet>
    </>
  )
}

export default WordStudyCompleteScreen
