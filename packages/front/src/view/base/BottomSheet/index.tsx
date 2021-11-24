import React from "react"
import c from "classnames"

export type BottomSheetProps = {
  className?: string
  children: React.ReactNode
}

const BottomSheet: React.VFC<BottomSheetProps> = ({ children, className }) => {
  return (
    <div className={c("fixed p-4 bg-gray-50 space-x-2 flex inset-x-0 bottom-0 shadow-main", className)}>{children}</div>
  )
}

export default BottomSheet
