import React from "react"
import c from "classnames"
import { Book, OwnedBook } from "../../../types/models"
import Thumbnail from "../category/Thumbnail"
import Title from "../../base/typography/Title"
import HeaderCard from "../../base/HeaderCard"
import { BookOpen, Star } from "react-feather"
import IconButton from "../../base/IconButton"

export type BookHeaderProps<Tab extends string> = {
  ownedBook: OwnedBook
  className?: string
  tabs: readonly { value: Tab; label: string }[]
  selectedTab: Tab
  onClickTab: (tab: Tab) => void
  onClickFavorite: () => void
  onClickStudy: () => void
}

const BookHeader = <Tab extends string>({
  ownedBook,
  className,
  selectedTab,
  onClickTab,
  tabs,
  onClickFavorite,
  onClickStudy,
}: BookHeaderProps<Tab>): React.ReactElement => {
  return (
    <HeaderCard
      className={c("flex flex-col space-y-1", className)}
      tabs={tabs}
      onChangeTab={onClickTab}
      selectedTab={selectedTab}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <Thumbnail size="large" category={ownedBook.book.category} className="flex-shrink-0">
            {ownedBook.book.title?.[0] ?? ""}
          </Thumbnail>
          <div className="w-full my-auto">
            <div className="flex items-center justify-between w-full">
              <Title>{ownedBook.book.title}</Title>
              <IconButton pressed={ownedBook.isFavorite} onClick={onClickFavorite} label="お気に入り">
                <Star
                  size="18px"
                  fill={ownedBook.isFavorite ? "rgb(251, 191, 36)" : "white"}
                  stroke={ownedBook.isFavorite ? "rgb(251, 191, 36)" : "#333"}
                />
              </IconButton>
            </div>
            <p className="space-x-4 text-sm">
              <span>
                <span className="text-base tabular-nums">{ownedBook.book.words.length}</span> cards
              </span>
              <span>
                <span className="text-base tabular-nums">{ownedBook.book.collaborators.length}</span> users
              </span>
            </p>
          </div>
        </div>
        <div className="flex justify-between space-x-2 text-sm">
          <div className="flex w-full px-4 py-2 space-x-4 bg-gray-100 rounded-md">
            <span>習得済み {ownedBook.statistics.done}</span>
            {/* TODO: word数を引っ張ってくる */}
            <span>未習得 0</span>
          </div>
          <button
            className="flex items-center justify-center flex-shrink-0 px-4 py-1 rounded-lg bg-primary/80 shadow-main"
            onClick={onClickStudy}
          >
            <div className="flex items-center space-x-2">
              <BookOpen stroke="white" size="18px" />
              <p className="flex-shrink-0 leading-none text-white">勉強する</p>
            </div>
          </button>
        </div>
      </div>
    </HeaderCard>
  )
}

export default BookHeader
