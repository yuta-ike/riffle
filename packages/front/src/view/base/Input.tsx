import React, { useCallback } from "react"
import c from "classnames"
import TextareaAutosize from "react-textarea-autosize"

export type InputProps = {
  value: string
  onChange: (value: string) => void
  className?: string
  minRows?: number
  disabled?: boolean
  placeholder?: string
  multi?: boolean
  type?: string
}

const Input: React.VFC<InputProps> = ({
  value,
  onChange,
  className,
  minRows = 1,
  disabled = false,
  placeholder,
  multi = false,
  type,
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      onChange(e.target.value)
    },
    [onChange],
  )

  const Component = multi ? TextareaAutosize : "input"

  return (
    <Component
      className={c(
        "w-full px-4 py-1 placeholder-gray-200 border border-gray-200 rounded-[12px] resize-none",
        className,
      )}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      {...(multi ? { minRows } : { type })}
    />
  )
}

export default Input
