import React, { useMemo } from "react"
import { Comment } from "../../../types/models"
import CircleImage from "../../components/CircleImage"
import c from "classnames"
import StampButton from "../stamp/StampButton"
import { Plus, Smile } from "react-feather"
import IconButton from "../../base/IconButton"
import STAMP_TYPES from "../../../constants/stampType"
import { useAuthUser } from "../../../provider/LiffProvider"

export type CommentColumnProps = {
  comment: Comment
  className?: string
}

const CommentColumn: React.VFC<CommentColumnProps> = ({ comment, className }) => {
  const user = useAuthUser()
  const stamps = useMemo(
    () =>
      STAMP_TYPES.map((stampType) => {
        const stamps = comment.stamps.filter(({ stampType: type }) => stampType === type)
        return {
          type: stampType,
          count: stamps.length,
          users: stamps.map((stamp) => stamp.author),
          pressed: stamps.find((stamp) => stamp.author.id === user?.id) != null,
        }
      }),
    [comment],
  )
  return (
    <div className={c("flex items-center w-full", className)}>
      <CircleImage url={comment.author.iconUrl} alt="" size="small" className="self-start flex-shrink-0 mr-3" />
      <div>
        <p className="flex-1">{comment.content}</p>
        {comment.stamps.length > 0 && (
          <div className="flex flex-wrap w-full mt-2 space-x-1">
            {stamps
              .filter(({ count }) => count !== 0)
              .map(({ type, count, pressed }) => (
                <StampButton key={type} stampType={type} count={count} pressed={pressed} onClick={console.log} />
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
  )
}

export default CommentColumn
