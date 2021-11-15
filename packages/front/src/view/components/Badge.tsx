import React from "react"
import c from "classnames"

export type BadgeProps = {
  className?: string
  backgroundColor?: string
  children: string
}

const Badge: React.VFC<BadgeProps> = ({ children, backgroundColor, className }) => {
  return (
    <span
      className={c("p-1 text-xs font-bold leading-none text-white rounded-md", className)}
      style={{ backgroundColor }}
    >
      {children}
    </span>
  )
}

export default Badge
