import React from "react"
import { OwnedBook, Word } from "../../../types/models"
import WordStudyScreen from "../WordStudyScreen"
import BottomModal from "../../base/BottomModal"

export type WordModalProps = {
  open: boolean
  onClose: () => void
  ownedBook: OwnedBook
  word: Word
}

const WordModal: React.VFC<WordModalProps> = ({ open, onClose, ownedBook, word }) => {
  return (
    <BottomModal open={open} onClose={onClose} height="tall">
      <WordStudyScreen ownedBook={ownedBook} word={word} disableInteraction />
    </BottomModal>
  )
}

export default WordModal
