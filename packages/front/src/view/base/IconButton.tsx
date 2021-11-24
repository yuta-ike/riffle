import React from "react"
import c from "classnames"

export type IconButtonProps = {
  children: React.ReactNode
  onClick: () => void
  label: string
  className?: string
  disabled?: boolean
  size?: "small" | "xs"
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButtonInner(
  { onClick, label, children, className, disabled, size = "small" },
  ref,
) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={c(
        "flex items-center justify-center rounded-full hover:bg-black/10",
        size === "small" ? "w-8 h-8" : "w-6 h-6",
        className,
      )}
      disabled={disabled}
      ref={ref}
    >
      {children}
    </button>
  )
})

export default IconButton
