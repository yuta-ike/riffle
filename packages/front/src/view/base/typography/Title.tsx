import React from "react"
import c from "classnames"

export type TitleProps = {
  children: string
  className?: string
}

const Title: React.VFC<TitleProps> = ({ children, className }) => {
  return <p className={c("text-lg font-bold truncate", className)}>{children}</p>
}

export default Title
