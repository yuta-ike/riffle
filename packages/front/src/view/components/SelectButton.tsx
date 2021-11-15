import c from "classnames"

export type SelectButtonProps = {
  isFirst: boolean
  isLast: boolean
  selected: boolean
  children: string
  onClick: () => void
}

const SelectButton: React.VFC<SelectButtonProps> = ({ isFirst, isLast, selected, children, onClick }) => {
  return (
    <button
      className={c(
        "flex-shrink-0 px-4 py-3 font-bold border-black/20 flex-1",
        isFirst && "rounded-l-md",
        isLast && "rounded-r",
        selected ? "bg-primary/80 text-white" : "bg-primary/20 text-gray-500",
      )}
      aria-pressed={selected}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default SelectButton
