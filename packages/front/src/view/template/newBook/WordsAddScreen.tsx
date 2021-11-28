import React, { useState } from "react"
import { Plus } from "react-feather"
import BottomSheet from "../../base/BottomSheet"
import Card from "../../base/Card"
import WordInput from "../../model/word/WordInput"

export type WordsAddScreenProps = {
  initWords?: { question: string; answer: string }[]
  onClickSubmit: (words: { question: string; answer: string }[]) => void
  onClickBack: () => void
}

const WordsAddScreen: React.VFC<WordsAddScreenProps> = ({
  initWords = [
    { question: "", answer: "" },
    { question: "", answer: "" },
  ],
  onClickSubmit,
  onClickBack,
}) => {
  const [words, setWords] = useState<{ question: string; answer: string }[]>(initWords)

  const canSubmit = words.filter(({ question, answer }) => question !== "" && answer !== "").length > 0

  return (
    <article className="flex flex-col items-center justify-start min-h-screen p-4 space-y-4 bg-gray-50">
      {words.map(({ question, answer }, index) => (
        <Card key={index} className="w-full">
          <WordInput
            question={question}
            answer={answer}
            onChangeQuestion={(value) =>
              setWords((prev) => {
                const newWords = [...prev]
                newWords[index]!.question = value
                return newWords
              })
            }
            onChangeAnswer={(value) =>
              setWords((prev) => {
                const newWords = [...prev]
                newWords[index]!.answer = value
                return newWords
              })
            }
          />
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
            onClick={onClickBack}
          >
            戻る
          </button>
          <button
            className="w-full p-2 border-2 border-solid rounded border-primary/80 text-primary disabled:text-gray-300 disabled:border-gray-200"
            onClick={() => onClickSubmit(words)}
            disabled={!canSubmit}
          >
            完了する
          </button>
        </div>
      </BottomSheet>
    </article>
  )
}

export default WordsAddScreen
