import React from "react"
import c from "classnames"
import { Check } from "react-feather"

type CheckIconProps = {
  done: boolean
  className?: string
}

const CheckIcon: React.VFC<CheckIconProps> = ({ done, className }) => {
  return (
    <div
      className={c(
        "flex items-center justify-center w-5 h-5 overflow-hidden rounded-full text-white hover:border-opacity-70",
        done ? "bg-check" : "bg-gray-100",
        className,
      )}
    >
      <Check size="14px" strokeWidth={3} stroke="white" />
    </div>
  )
}

export default CheckIcon
