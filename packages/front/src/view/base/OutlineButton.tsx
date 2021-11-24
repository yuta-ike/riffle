import React from "react"
import c from "classnames"
import Link from "next/link"

export type OutlineButtonProps = {
  children: React.ReactNode
  color?: "primary" | "gray"
  className?: string
  fullWidth?: boolean
  size?: "normal" | "small"
} & (
  | {
      href?: undefined
      onClick: () => void
      disabled?: boolean
    }
  | {
      href: string
      onClick?: undefined
    }
)

const OutlineButton: React.VFC<OutlineButtonProps> = ({
  children,
  color = "primary",
  className,
  fullWidth = false,
  size = "normal",
  ...rest
}) => {
  const _className = c(
    "border-2 border-solid rounded disabled:text-gray-300 disabled:border-gray-200 text-center",
    color === "primary" ? "border-primary/80 text-primary" : "text-gray-500 border-2 border-gray-500",
    fullWidth && "w-full",
    size === "normal" ? "px-3 py-2 text-base" : "px-3 py-1 text-sm",
    className,
  )

  if (rest.href == null) {
    return (
      <button className={_className} onClick={rest.onClick} disabled={rest.disabled}>
        {children}
      </button>
    )
  } else {
    return (
      <Link href={rest.href}>
        <a className={_className}>{children}</a>
      </Link>
    )
  }
}

export default OutlineButton
