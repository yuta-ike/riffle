import React from "react"
import c from "classnames"
import { Circle, X as Cross } from "react-feather"

export type ResultIconProps = {
  className?: string
  result: boolean
}

const ResultIcon: React.VFC<ResultIconProps> = ({ className, result }) => {
  return (
    <div className={c(result && "p-[1px]", className)}>
      {result ? (
        <Circle stroke="rgb(16, 185, 129)" size="20px" strokeWidth={4} />
      ) : (
        <Cross stroke="#EF4444" size="22px" strokeWidth={4} />
      )}
    </div>
  )
}

export default ResultIcon
