import React from "react"
import c from "classnames"

export type ButtonProps = {
  children: React.ReactNode
  onClick: () => void
  className?: string
  fullWidth?: boolean
}

const Button: React.VFC<ButtonProps> = ({ children, onClick, className, fullWidth = false }) => {
  return (
    <button
      onClick={onClick}
      className={c(
        "px-4 py-3 text-lg font-bold border-2 rounded-lg border-primary/80 text-primary/80 leading-none text-center bg-white",
        fullWidth ? "w-full" : "",
        className,
      )}
    >
      {children}
    </button>
  )
}

export default Button
