import React from "react"
import c from "classnames"
import Input from "../../base/Input"
import IconButton from "../../base/IconButton"
import { MinusCircle } from "react-feather"

export type WordInputProps = {
  question: string
  answer: string
  onChangeQuestion: (question: string) => void
  onChangeAnswer: (answer: string) => void
  onClickDelete?: () => void
  className?: string
}

const WordInput: React.VFC<WordInputProps> = ({
  question,
  answer,
  onChangeQuestion,
  onChangeAnswer,
  onClickDelete,
  className,
}) => {
  return (
    <div className={c("flex space-x-2", className)}>
      <div className="w-full">
        <div className="flex space-x-3">
          <p className="flex-shrink-0 text-xl font-bold mt-1.5 leading-none text-question" aria-label="問題">
            Q
          </p>
          <Input value={question} onChange={onChangeQuestion} multi minRows={2} />
        </div>
        <hr className="my-2" />
        <div className="flex space-x-3">
          <p className="flex-shrink-0 text-xl font-bold mt-1.5 leading-none text-answer" aria-label="解答">
            A
          </p>
          <Input value={answer} onChange={onChangeAnswer} multi minRows={2} />
        </div>
      </div>
      <div className="flex items-start justify-center flex-shrink-0">
        <IconButton
          label="削除する"
          onClick={() => onClickDelete?.()}
          className={c(onClickDelete == null && "invisible")}
        >
          <MinusCircle className="red" stroke="rgb(239, 68, 68)" />
        </IconButton>
      </div>
    </div>
  )
}

export default WordInput
