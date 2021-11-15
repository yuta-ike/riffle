import React, { useState } from "react"
import { OwnedBook, Word } from "../../../types/models"
import Card from "../../base/Card"
import CheckIcon from "../../components/CheckIcon"
import WordModal from "../../template/modal/WordModal"

export type WordCardProps = {
  ownedBook: OwnedBook
  word: Word
}

const WordCard: React.VFC<WordCardProps> = ({ ownedBook, word }) => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <button onClick={() => setOpenModal(true)}>
        <Card className="flex flex-col space-y-2 text-left">
          <div>{word.question}</div>
          <hr />
          <div>{word.answer}</div>
          <div className="flex items-center self-end space-x-4">
            <div className="text-xs leading-none">{word.comments.length}コメント</div>
            <CheckIcon done={word.done} />
          </div>
        </Card>
      </button>
      <WordModal open={openModal} onClose={() => setOpenModal(false)} ownedBook={ownedBook} word={word} />
    </>
  )
}

export default WordCard
