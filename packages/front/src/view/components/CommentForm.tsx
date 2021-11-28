import React, { useState } from "react"
import { Send } from "react-feather"
import { CommentType } from "../../types/models"
import IconButton from "../base/IconButton"
import Input from "../base/Input"

export type CommentFormProps = {
  minRows?: number
  onSend: (commentType: CommentType, value: string) => Promise<void>
}

const CommentForm: React.VFC<CommentFormProps> = ({ onSend, minRows = 1 }) => {
  const [value, setValue] = useState("")
  const disabled = value.length === 0

  return (
    <div className="fixed inset-x-0 bottom-0 px-2 pt-2 mb-2 pb-[calc(env(safe-area-inset-bottom))] space-y-4 bg-gray-50 shadow-main">
      <div className="flex items-end space-x-2">
        <Input
          className="w-full px-4 py-1 placeholder-gray-200 border border-gray-200 rounded-[12px]"
          placeholder="コメント"
          value={value}
          onChange={setValue}
          minRows={minRows}
          multi
        />
        <IconButton
          onClick={() => onSend("default", value).then(() => setValue(""))}
          label="送信"
          className="flex-shrink-0 "
          disabled={disabled}
        >
          <Send size="22px" strokeWidth={2} stroke={disabled ? "#c0c0c0" : "#404040"} />
        </IconButton>
      </div>
    </div>
  )
}

export default CommentForm
