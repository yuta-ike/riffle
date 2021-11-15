import React from "react"
import c from "classnames"

export type IconButtonProps = {
  children: React.ReactNode
  onClick: () => void
  label: string
  className?: string
  disabled?: boolean
}

const IconButton: React.VFC<IconButtonProps> = ({ onClick, label, children, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={c("flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/10", className)}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default IconButton
