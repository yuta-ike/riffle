import React, { useMemo } from "react"
import { OwnedBook, Comment, StampType } from "../../../types/models"
import CircleImage from "../../components/CircleImage"
import c from "classnames"
import StampButton from "../stamp/StampButton"
import STAMP_TYPES from "../../../constants/stampType"
import { useAuthUser } from "../../../provider/LiffProvider"
import { useRequest } from "../../../lib/apiClient/hooks"
import { useSWRConfig } from "swr"
import PostStampButton from "../stamp/PostStampButton"

export type CommentColumnProps = {
  ownedBook: OwnedBook
  comment: Comment
  className?: string
}

const CommentColumn: React.VFC<CommentColumnProps> = ({ comment, className, ownedBook }) => {
  const user = useAuthUser()
  const { mutate } = useSWRConfig()
  const { post, deleteRequest } = useRequest()

  const book = ownedBook.book

  const stamps = useMemo(
    () =>
      STAMP_TYPES.map((stampType) => {
        const stamps = comment.stamps.filter(({ stampType: type }) => stampType === type)
        return {
          type: stampType,
          count: stamps.length,
          users: stamps.map((stamp) => stamp.author),
          myStampId: stamps.find((stamp) => stamp.author.id === user?.id)?.id,
        }
      }),
    [comment.stamps, user?.id],
  )

  const postStamp = async (stampType: StampType) => {
    await post(
      { url: "/book/{bookId}/comment/{commentId}/stamp", params: { bookId: book.id, commentId: comment.id } },
      {
        stampType,
      },
    )
    mutate(`/owned-book/${ownedBook.id}`)
  }

  const deleteStamp = async (stampId: number) => {
    await deleteRequest({
      url: "/book/{bookId}/comment/{commentId}/stamp/{stampId}",
      params: { bookId: book.id, commentId: comment.id, stampId },
    })
    mutate(`/owned-book/${ownedBook.id}`)
  }

  return (
    <div className={c("flex items-center w-full relative", className)}>
      <CircleImage url={comment.author.iconUrl} alt="" size="xs" className="self-start flex-shrink-0 mr-3" />
      <div className="space-y-0.5">
        <div className="text-[10px] text-gray-400">1日前</div>
        <div className="flex">
          <div className="space-y-1">
            <p className="flex-1 mr-2 text-sm">{comment.content}</p>
            {comment.stamps.length > 0 && (
              <div className="flex flex-wrap w-full space-x-1">
                {stamps
                  .filter(({ count }) => count !== 0)
                  .map(({ type, count, myStampId }) => (
                    <StampButton
                      key={type}
                      stampType={type}
                      count={count}
                      pressed={myStampId != null}
                      onClick={() => {
                        if (myStampId != null) {
                          deleteStamp(myStampId)
                        } else {
                          postStamp(type)
                        }
                      }}
                    />
                  ))}
                <PostStampButton
                  onPostStamp={postStamp}
                  stampCounts={
                    Object.fromEntries(
                      stamps.map(({ type, count, myStampId }) => [type, { count, pressed: myStampId != null }]),
                    ) as Record<StampType, { count: number; pressed: boolean }>
                  }
                />
              </div>
            )}
          </div>
          {comment.stamps.length === 0 && (
            <PostStampButton
              onPostStamp={postStamp}
              stampCounts={{
                thumbsup: { count: 0, pressed: false },
                heart: { count: 0, pressed: false },
                star: { count: 0, pressed: false },
                award: { count: 0, pressed: false },
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentColumn
