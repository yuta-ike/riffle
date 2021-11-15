import React from "react"
import c from "classnames"

type FlashDotProps = {
  className?: string
}

const FlashDot: React.VFC<FlashDotProps> = ({ className }) => {
  return (
    <div className={c("flex w-3 h-3 relative", className)}>
      <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping" />
      <span className="inline-flex w-3 h-3 bg-red-500 rounded-full shadow" />
    </div>
  )
}

export default FlashDot
