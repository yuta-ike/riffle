import { Popover, Transition } from "@headlessui/react"
import React, { Fragment, useRef } from "react"
import { Plus, Smile } from "react-feather"
import STAMP_TYPES from "../../../constants/stampType"
import { StampType } from "../../../types/models"
import StampButton from "./StampButton"

export type PostStampButtonProps = {
  onPostStamp: (stampType: StampType) => void
  stampCounts: Record<StampType, { count: number; pressed: boolean }>
}

const PostStampButton: React.VFC<PostStampButtonProps> = ({ onPostStamp, stampCounts }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const closePopover = () => {
    buttonRef.current?.click()
  }

  return (
    <Popover>
      {/* @ts-ignore NOTE: とりあえずうまくいくのでこのまま */}
      <Popover.Button as={Fragment} ref={buttonRef}>
        <button className="relative flex items-center px-2 py-1 space-x-1 leading-none rounded-full">
          <Smile stroke="grey" size="16px" />
          <Plus stroke="grey" size="10px" strokeWidth={3} className="absolute top-0 right-0" />
        </button>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 max-w-[80vw] px-4 py-2 mt-2 transform -translate-x-1/2 bg-white rounded-lg left-1/2 shadow-main flex justify-center space-x-2">
          {STAMP_TYPES.map((type) =>
            stampCounts[type].pressed ? null : (
              <StampButton
                key={type}
                stampType={type}
                count={stampCounts[type].count}
                pressed={stampCounts[type].pressed}
                onClick={() => {
                  onPostStamp(type)
                  closePopover()
                }}
              />
            ),
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default PostStampButton
