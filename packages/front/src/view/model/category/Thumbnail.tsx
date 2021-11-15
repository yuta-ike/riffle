import React from "react"
import c from "classnames"
import { Category } from "../../../types/models"
import CATEGORY_COLORS from "../../constants/categoryColor"

export type ThumbnailProps = {
  category: Category | null
  className?: string
  children: string
  size: "large" | "medium" | "small"
}

const Thumbnail: React.VFC<ThumbnailProps> = ({ category, className, children, size }) => {
  return (
    <div
      className={c(
        "overflow-hidden text-white flex items-center justify-center",
        size === "large"
          ? "w-16 h-16 text-2xl rounded-2xl"
          : size === "medium"
          ? "w-12 h-12 text-xl rounded-xl"
          : "w-6 h-6 text-sm rounded-lg",
        className,
      )}
      style={{ backgroundColor: category == null ? "rgb(209, 213, 219)" : CATEGORY_COLORS[category] }}
    >
      {children[0]}
    </div>
  )
}

export default Thumbnail
