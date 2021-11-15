import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react"
import CompleteModal from "../view/components/CompleteModal"

export type ModalContext = {
  show: (message?: string) => Promise<void>
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
  const [open, setOpen] = useState(false)
  const messageRef = useRef<string | undefined>(undefined)
  const closeModalCallback = useRef<() => void>()
  const show = useCallback(
    (message?: string) => {
      messageRef.current = message
      setOpen(true)
      return new Promise<void>((resolve) => {
        closeModalCallback.current = resolve
      })
    },
    [closeModalCallback],
  )

  const handleClose = useCallback(() => {
    setOpen(false)
    closeModalCallback.current?.()
  }, [setOpen, closeModalCallback])

  const value = useMemo(() => ({ show }), [show])

  return (
    <>
      <CompleteModal open={open} onClose={handleClose} message={messageRef.current ?? "完了しました!!"} />
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    </>
  )
}

export default ModalProvider

export const useModal = () => useContext(ModalContext)
