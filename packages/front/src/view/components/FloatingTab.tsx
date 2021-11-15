import React from "react"
import c from "classnames"

export type FloatingTabProps<Value extends string> = {
  labels: {
    value: Value
    label: string
  }[]
  onClick: (value: Value) => void
  selected: Value
}

const FloatingTab = <Value extends string>({
  labels,
  onClick,
  selected,
}: FloatingTabProps<Value>): React.ReactElement => {
  return (
    <div className="fixed flex justify-center transform -translate-x-1/2 rounded-full bottom-16 left-1/2 shadow-main w-[300px] border-primary/80 border-solid border">
      {labels.map(({ label, value }, index) => (
        <button
          key={value}
          onClick={() => onClick(value)}
          className={c(
            "flex-shrink-0 py-4 font-bold border-black/10 flex-1",
            index === 0 && "rounded-l-full pr-2 pl-4",
            index === labels.length - 1 && "rounded-r-full pr-4 pl-2",
            index !== 0 && index !== labels.length - 1 && "px-2",
            selected === value ? "bg-primary/80 text-white" : "bg-white/50",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default FloatingTab
