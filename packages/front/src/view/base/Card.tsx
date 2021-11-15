import React from "react"
import c from "classnames"

type CardProps = {
  children: React.ReactNode
  className?: string
  rounded?: boolean
}

const Card: React.VFC<CardProps> = ({ children, className, rounded = true }) => {
  return (
    <div
      className={c(
        "relative px-4 py-3 bg-white shadow-main border border-black/10 border-solid",
        rounded && "rounded-lg",
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Card
