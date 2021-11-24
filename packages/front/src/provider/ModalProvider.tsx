import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react"
import CompleteModal from "../view/components/CompleteModal"
import ConfirmModal from "../view/components/ConfirmModal"

export type ModalType = "complete" | "confirm"

export type ModalContext = {
  show: <T = unknown>(type: ModalType, message?: string) => Promise<T>
}

const ModalContext = createContext<ModalContext>({
  show: () => {
    throw new Error("cannot use useModal outside of provider.")
  },
})

export type ModalProviderProps = {
  children: React.ReactNode
}

const ModalProvider: React.VFC<ModalProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<ModalType | null>(null)
  const messageRef = useRef<string | undefined>(undefined)
  const closeModalCallback = useRef<(arg?: unknown) => void>()
  const show = useCallback(
    (type: ModalType, message?: string) => {
      messageRef.current = message
      setOpen(type)
      return new Promise<unknown>((resolve) => {
        closeModalCallback.current = resolve
      })
    },
    [closeModalCallback],
  )

  const handleClose = useCallback(
    (arg?: unknown) => {
      setOpen(null)
      closeModalCallback.current?.(arg)
    },
    [setOpen, closeModalCallback],
  )

  const value = useMemo(() => ({ show }), [show])

  return (
    <>
      <CompleteModal
        open={open === "complete"}
        onClose={handleClose}
        message={messageRef.current ?? "完了しました!!"}
      />
      <ConfirmModal open={open === "confirm"} onClose={handleClose} message={messageRef.current ?? ""} />
      {/* @ts-ignore */}
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    </>
  )
}

export default ModalProvider

export const useModal = () => useContext(ModalContext)
