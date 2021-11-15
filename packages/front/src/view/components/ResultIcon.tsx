import React from "react"
import { Circle, X as Cross } from "react-feather"

export type ResultIconProps = {
  className?: string
  result: boolean
}

const ResultIcon: React.VFC<ResultIconProps> = ({ className, result }) => {
  return (
    <div className="flex-shrink-0">
      {result ? <Circle stroke="rgb(16, 185, 129)" strokeWidth={4} /> : <Cross stroke="#EF4444" strokeWidth={4} />}
    </div>
  )
}

export default ResultIcon
