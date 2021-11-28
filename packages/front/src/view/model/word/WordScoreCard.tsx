import React, { useState } from "react"
import c from "classnames"
import { OwnedBook, Word, WordScore } from "../../../types/models"
import Card from "../../base/Card"
import ResultIcon from "../../components/ResultIcon"
import WordModal from "../../template/modal/WordModal"

export type WordScoreCardProps = {
  ownedBook: OwnedBook
  word: Word
  wordScore: WordScore
  overrideChecked?: boolean
  className?: string
  onClickCheck?: () => void
  disableModalInteraction?: boolean
}

const WordScoreCard: React.VFC<WordScoreCardProps> = ({
  ownedBook,
  word,
  wordScore,
  className,
  onClickCheck,
  overrideChecked,
  disableModalInteraction = false,
}) => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <div className={className} onClick={disableModalInteraction ? undefined : () => setOpenModal(true)}>
        <Card className="flex items-center w-full space-x-4">
          <div className="w-full">
            <div>{word.question}</div>
            <div>{word.answer}</div>
          </div>
          {onClickCheck != null ? (
            <button className="flex-shrink-0" onClick={onClickCheck}>
              <ResultIcon result={overrideChecked ?? wordScore.result} />
            </button>
          ) : (
            <div className="flex-shrink-0" onClick={onClickCheck}>
              <ResultIcon result={overrideChecked ?? wordScore.result} />
            </div>
          )}
        </Card>
      </div>
      <WordModal open={openModal} onClose={() => setOpenModal(false)} ownedBook={ownedBook} word={word} />
    </>
  )
}

export default WordScoreCard
