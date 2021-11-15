import React from "react"
import { Heart, Plus, Smile, Star, ThumbsUp, Volume2 } from "react-feather"
import { Book, Comment, OwnedBook, Word } from "../../../types/models"
import CircleImage from "../../components/CircleImage"
import IconButton from "../../base/IconButton"
import Title from "../../base/typography/Title"
import Thumbnail from "../category/Thumbnail"
import StampButton from "../stamp/StampButton"

export type CommentCardProps = {
  book: Book
  word?: Word
  comment: Comment
}

const CommentCard: React.VFC<CommentCardProps> = ({ comment, book, word }) => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center space-x-2">
        {/* <Thumbnail category={book.category} size="small" className="flex-shrink-0">
          {book.title?.[0] ?? ""}
        </Thumbnail> */}
        <p className="text-sm leading-none text-gray-400">
          ■{" "}
          {word != null ? (
            <>
              <span className="text-gray-400">{`${word.question} ｜ `}</span>
              <span className="text-xs text-gray-400">{book.title}</span>
            </>
          ) : (
            book.title
          )}
        </p>
      </div>
      <div className="flex items-center space-x-3">
        <CircleImage url={comment.author.iconUrl} alt="" size="small" className="self-start flex-shrink-0" />
        <div>
          <p className="flex-1">{comment.content}</p>
          {comment.stamps.length > 0 && (
            <div className="flex flex-wrap w-full mt-2 space-x-1">
              {comment.stamps.map((stamp) => (
                <StampButton
                  key={stamp.id}
                  stampType={stamp.stampType}
                  onClick={console.log}
                  count={0}
                  pressed={false}
                />
              ))}
              <button className="relative flex items-center px-2 py-1 space-x-1 leading-none rounded-full">
                <Smile size="16px" />
                <Plus size="10px" strokeWidth={3} className="absolute top-0 right-0" />
              </button>
            </div>
          )}
        </div>
        {comment.stamps.length === 0 && (
          <IconButton onClick={console.log} label="リアクションする" className="ml-auto">
            <Smile size="16px" />
          </IconButton>
        )}
      </div>
    </div>
  )
}

export default CommentCard
