import React, { useState } from "react"
import c from "classnames"
import { Bell } from "react-feather"
import { User } from "../../../types/models"
import CircleImage from "../../components/CircleImage"
import IconButton from "../../base/IconButton"
import HeaderCard, { TabItem } from "../../base/HeaderCard"

export type UserHeaderProps<Tab extends string> = {
  user: User
  className?: string
  selectedTab: Tab
  tabs: readonly TabItem<Tab>[]
  onChangeTab: (tab: Tab) => void
}

const UserHeader = <Tab extends string>({ user, tabs, selectedTab, onChangeTab, className }: UserHeaderProps<Tab>) => {
  return (
    <HeaderCard<Tab>
      className={c("flex flex-col", className)}
      // tabs={tabs}
      // onChangeTab={onChangeTab}
      // selectedTab={selectedTab}
    >
      <div className="flex space-x-4">
        <div className="flex items-center flex-shrink-0">
          <CircleImage size="large" url={user.iconUrl} />
        </div>
        <div className="flex flex-col w-full py-2 space-y-2">
          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-bold leading-none">{user.name}</p>
            <IconButton onClick={() => console.log("お知らせ")} label="お知らせ">
              <Bell size="16px" strokeWidth={3} />
            </IconButton>
          </div>
          <div className="flex justify-between w-full max-w-[160px]">
            <div className="text-sm">
              <span className="text-xs">今日:</span> 0
            </div>
            <div className="text-sm">
              <span className="text-xs">今週:</span> 0
            </div>
            <div className="text-sm">
              <span className="text-xs">今月:</span> 0
            </div>
          </div>
        </div>
      </div>
    </HeaderCard>
  )
}

export default UserHeader
