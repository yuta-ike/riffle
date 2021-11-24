import React from "react"
import c from "classnames"
import { User } from "../../types/models"
import CircleImage from "./CircleImage"

export type CircleImageListProps = {
  users: User[]
  count?: number
  className?: string
}

const CircleImageList: React.VFC<CircleImageListProps> = ({ users, count = 4, className }) => {
  return (
    <div className={c("relative flex h-[20px]", className)} style={{ width: `${20 + count * 10}px` }}>
      {users.slice(users.length - count).map((user, index) => (
        <div key={index} className="absolute left-0" style={{ transform: `translateX(${60 * index}%)` }}>
          <div className="relative">
            <CircleImage url={user.iconUrl} size="tiny" className="border-2 border-white" />
            {index === count - 1 && (
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white border-2 border-white rounded-full bg-black/50">
                +{users.length - count}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CircleImageList
