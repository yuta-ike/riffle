import React from "react"
import c from "classnames"
import { Word, WordScore } from "../../../types/models"
import Card from "../../base/Card"
import CheckIcon from "../../components/CheckIcon"

export type WordScoreCardProps = {
  word: Word
  wordScore: WordScore
  overrideChecked?: boolean
  className?: string
  onClickCheck: () => void
}

const WordScoreCard: React.VFC<WordScoreCardProps> = ({
  word,
  wordScore,
  className,
  onClickCheck,
  overrideChecked,
}) => {
  return (
    <Card className={c("flex items-center space-x-4", className)}>
      <div className="w-full">
        <div>{word.question}</div>
        <div>{word.answer}</div>
      </div>
      <div className="flex-shrink-0">
        <button onClick={onClickCheck}>
          <CheckIcon done={overrideChecked ?? wordScore.result} />
        </button>
      </div>
    </Card>
  )
}

export default WordScoreCard
