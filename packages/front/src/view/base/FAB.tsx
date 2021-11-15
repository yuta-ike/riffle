import React from "react"
import c from "classnames"

export type FabProps = {
  children: React.ReactNode
  onClick: () => void
  notSquare?: boolean
}

const Fab: React.VFC<FabProps> = ({ children, onClick, notSquare = false }) => {
  return (
    <div className="fixed bottom-4 right-4">
      <button
        className={c(
          "flex items-center justify-center h-16 bg-primary/80 rounded-3xl shadow-main",
          notSquare ? "w-16" : "px-4",
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}

export default Fab
