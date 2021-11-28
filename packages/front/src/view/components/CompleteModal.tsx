import React from "react"
import { Dialog } from "@headlessui/react"
import BaseModal from "../base/BaseModal"

export type CompleteModalProps = {
  open: boolean
  onClose: () => void
  message: string
}

const CompleteModal: React.VFC<CompleteModalProps> = ({ open, onClose, message }) => {
  return (
    <BaseModal open={open} onClose={onClose}>
      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
        {message}
      </Dialog.Title>
      <div className="text-[48px] my-8">🎉</div>

      <div className="mt-4">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </BaseModal>
  )
}

export default CompleteModal
