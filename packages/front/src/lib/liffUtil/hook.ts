import { useLiff } from "../../provider/LiffProvider"

export const useShareTargetPickerAvailable = () => {
  const liff = useLiff()
  return liff == null || liff.isApiAvailable("shareTargetPicker")
}
