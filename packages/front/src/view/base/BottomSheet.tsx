import React from "react"
import c from "classnames"

export type BottomSheetProps = {
  className?: string
  children: React.ReactNode
}

const BottomSheet: React.VFC<BottomSheetProps> = ({ children, className }) => {
  return <div className={c("fixed inset-x-0 bottom-0 p-8 shadow-main", className)}>{children}</div>
}

export default BottomSheet
