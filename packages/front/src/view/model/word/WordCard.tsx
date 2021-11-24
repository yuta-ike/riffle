import React, { useState } from "react"
import { MessageCircle } from "react-feather"
import { OwnedBook, Word } from "../../../types/models"
import Card from "../../base/Card"
import CheckIcon from "../../components/CheckIcon"
import CircleImageList from "../../components/CircleImageList"
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
          <div className="flex space-x-3">
            <p className="flex-shrink-0 text-xl font-bold leading-none mt-0.5 text-question" aria-label="問題">
              Q
            </p>
            <p>{word.question}</p>
          </div>
          <hr />
          <div className="flex space-x-3">
            <p className="flex-shrink-0 text-xl font-bold leading-none mt-0.5 text-answer" aria-label="解答">
              A
            </p>
            <p>{word.answer}</p>
          </div>
          <div className="flex items-center self-end space-x-4">
            {word.comments.length > 0 && (
              <div className="flex items-center space-x-1">
                <MessageCircle stroke="grey" size="18px" />
                <CircleImageList users={word.comments.map(({ author }) => author)} />
              </div>
            )}
            <CheckIcon done={word.done} />
          </div>
        </Card>
      </button>
      <WordModal open={openModal} onClose={() => setOpenModal(false)} ownedBook={ownedBook} word={word} />
    </>
  )
}

export default WordCard
