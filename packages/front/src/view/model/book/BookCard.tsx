import React from "react"
import { CheckCircle, Users } from "react-feather"
import { OwnedBook } from "../../../types/models"
import Title from "../../base/typography/Title"
import CategoryBadge from "../category/CategoryBadge"
import Thumbnail from "../category/Thumbnail"

export type BookCardProps = {
  ownedBook: OwnedBook
}

const BookCard: React.VFC<BookCardProps> = ({ ownedBook }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      {/* <div className="text-sm text-gray-400">■ {ownedBook.book.title}</div> */}
      <div className="flex space-x-4">
        <Thumbnail category={ownedBook.book.category} size="large" className="flex-shrink-0">
          {ownedBook.book.title?.[0] ?? ""}
        </Thumbnail>
        <div className="flex flex-col w-full space-y-2">
          <div className="flex">
            <Title>{ownedBook.book.title}</Title>
            <div className="flex items-center justify-center flex-shrink-0 ml-4">
              <CategoryBadge category={ownedBook.book.category} />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400">最後に勉強した日: 1日前</p>
          </div>
          <div className="flex px-2 py-1 space-x-4 bg-gray-100 rounded">
            <div className="flex items-center space-x-2 leading-none">
              <CheckCircle size="16px" stroke="#37ac4b" strokeWidth={4} />
              <span className="text-sm">{ownedBook.statistics.done}</span>
            </div>
            <div className="flex items-center space-x-2 leading-none">
              <Users size="16px" strokeWidth={3} />
              <span className="text-sm">{ownedBook.book.collaborators.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard
