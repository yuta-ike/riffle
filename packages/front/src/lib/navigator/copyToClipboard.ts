export const canUseCopyToClipboard = () => "clipboard" in navigator

export const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text)
}
