import React, { Fragment } from "react"
import c from "classnames"
import { Transition, Dialog } from "@headlessui/react"
import IconButton from "./IconButton"
import { X as Cross } from "react-feather"

export type BottomModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  height: "tall" | "short"
  title?: string
}

const BottomModal: React.VFC<BottomModalProps> = ({ open, onClose, children, height, title }) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 h-full overflow-y-hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black/20" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300 transform overflow-y-hidden"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="ease-in duration-200 transform"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <div
            className={c(
              "absolute bottom-0 z-30 w-full px-4 bg-gray-50 h-[90vh] rounded-t-3xl shadow-main overflow-y-hidden",
              height === "tall" ? "h-[90vh]" : "h-[40vh]",
            )}
          >
            <div className="grid grid-cols-3 py-2 text-right">
              <span />
              <div className="flex items-center justify-center w-full h-full">
                {title != null && <Dialog.Title className="font-bold leading-none">{title}</Dialog.Title>}
              </div>
              <IconButton label="とじる" className="ml-auto" onClick={onClose}>
                <Cross />
              </IconButton>
            </div>
            <div className="h-full">{children}</div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default BottomModal
