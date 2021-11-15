import React from "react"
import CATEGORY_LABELS from "../../../constants/category"
import { Category } from "../../../types/models"
import Badge from "../../components/Badge"
import CATEGORY_COLORS from "../../constants/categoryColor"

export type CategoryBadgeProps = {
  category: Category
  className?: string
}

const CategoryBadge: React.VFC<CategoryBadgeProps> = ({ category, className }) => {
  return (
    <Badge className={className} backgroundColor={CATEGORY_COLORS[category]}>
      {CATEGORY_LABELS[category]}
    </Badge>
  )
}

export default CategoryBadge
