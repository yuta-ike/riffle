import React from "react"
import c from "classnames"

export type TabItem<Tab extends string> = {
  value: Tab
  label: string
}

type HeaderCardProps<Tab extends string> = {
  children: React.ReactNode
  selectedTab?: Tab
  tabs?: readonly TabItem<Tab>[]
  onChangeTab?: (value: Tab) => void
  className?: string
}

const HeaderCard = <Tab extends string>({
  children,
  tabs,
  selectedTab,
  onChangeTab,
  className,
}: HeaderCardProps<Tab>): React.ReactElement => {
  return (
    <div className={c("relative bg-white shadow-main border-b border-black/10 border-solid", className)}>
      <div className="w-full px-4 py-3">{children}</div>
      {tabs != null && (
        <div className="flex w-full overflow-x-scroll flex-nowrap whitespace-nowrap overscroll-x-none">
          {tabs.map(({ value, label }, index) => (
            <button
              key={value}
              className={c(
                "flex-1 px-2 py-2 text-sm m-1",
                index === 0 && "ml-4",
                index === tabs.length - 1 && "mr-4",
                selectedTab === value && "bg-primary/80 text-white rounded",
              )}
              onClick={() => onChangeTab?.(value)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default HeaderCard
