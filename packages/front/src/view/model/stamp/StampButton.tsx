import React, { useCallback } from "react"
import c from "classnames"
import { ThumbsUp, Heart, Star, Award } from "react-feather"

type StampButtonProps = {
  stampType: string
  count: number
  pressed: boolean
  onClick: (stampType: string) => void
}

const StampButton: React.VFC<StampButtonProps> = ({ stampType, count, pressed, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(stampType)
  }, [onClick, stampType])

  return (
    <button
      className={c(
        "flex items-center px-1.5 py-0.5 space-x-1 leading-none border border-solid rounded-full shadow-sm",
        pressed ? "bg-primary/10 border-primary/80" : "bg-gray-200 border-transparent",
      )}
      onClick={handleClick}
    >
      {stampType === "thumbsup" ? (
        <ThumbsUp size="15px" fill="rgb(255, 138, 138)" />
      ) : stampType === "heart" ? (
        <Heart size="15px" fill="rgb(255, 130, 222)" />
      ) : stampType === "star" ? (
        <Star size="15px" fill="rgb(254, 242, 126)" />
      ) : stampType === "award" ? (
        <Award size="15px" fill="rgb(255, 205, 130)" />
      ) : null}
      <span className="text-xs">{count}</span>
    </button>
  )
}

export default StampButton
