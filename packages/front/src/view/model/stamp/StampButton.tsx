import React, { useCallback } from "react"
import { ThumbsUp, Heart, Star, Award } from "react-feather"
import { StampType } from "../../../types/models"

type StampButtonProps = {
  stampType: string
  count: number
  pressed: boolean
  onClick: (stampType: string) => void
}

const StampButton: React.VFC<StampButtonProps> = ({ stampType, count, pressed, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(stampType)
  }, [stampType])
  return (
    <button className="flex items-center px-2 py-1 space-x-1 leading-none bg-gray-100 rounded" onClick={handleClick}>
      {stampType === "thumbsup" ? (
        <ThumbsUp size="14px" />
      ) : stampType === "heart" ? (
        <Heart size="14px" />
      ) : stampType === "star" ? (
        <Star size="14px" />
      ) : stampType === "award" ? (
        <Award size="14px" />
      ) : null}
      <span className="text-xs">{count}</span>
    </button>
  )
}

export default StampButton
