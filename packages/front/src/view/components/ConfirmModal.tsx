import React from "react"
import { Dialog } from "@headlessui/react"
import BaseModal from "../base/BaseModal"

export type ConfirmModalProps = {
  open: boolean
  onClose: (result: boolean) => void
  message: string
}

const ConfirmModal: React.VFC<ConfirmModalProps> = ({ open, onClose, message }) => {
  return (
    <BaseModal open={open} onClose={() => onClose(false)}>
      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
        {message}
      </Dialog.Title>

      <div className="mt-4 space-x-2">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
          onClick={() => onClose(false)}
        >
          キャンセル
        </button>
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          onClick={() => onClose(true)}
        >
          進める
        </button>
      </div>
    </BaseModal>
  )
}

export default ConfirmModal
