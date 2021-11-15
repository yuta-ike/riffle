import React from "react"
import { OwnedBook } from "../../../types/models"
import CircleImage from "../../components/CircleImage"
import FlashDot from "../../components/FlashDot"
import Title from "../../base/typography/Title"
import Thumbnail from "../category/Thumbnail"

export type MeetingBookCardProps = {
  ownedBook: OwnedBook
}

const MeetingBookCard: React.VFC<MeetingBookCardProps> = ({ ownedBook }) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <FlashDot />
        <p className="text-sm text-gray-400">進行中の勉強会</p>
      </div>
      <div className="flex items-center space-x-4">
        <Thumbnail category={ownedBook.book.category} size="medium" className="flex-shrink-0">
          {ownedBook.book.title?.[0] ?? ""}
        </Thumbnail>
        <div className="flex flex-col justify-around w-full space-y-1">
          <div className="flex items-center justify-between w-full">
            <p className="text-sm">{ownedBook.book.title}</p>
            <p className="text-xs text-gray-400">12分前</p>
          </div>
          <div className="flex -space-x-1">
            <CircleImage
              size="tiny"
              url="https://www.newsweekjapan.jp/stories/assets_c/2020/10/iStock-978803352a-thumb-720xauto-218530.jpeg"
              alt=""
              className="border-2 border-white border-solid"
            />
            <CircleImage
              size="tiny"
              url="https://www.newsweekjapan.jp/stories/assets_c/2020/10/iStock-978803352a-thumb-720xauto-218530.jpeg"
              alt=""
              className="border-2 border-white border-solid"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeetingBookCard
