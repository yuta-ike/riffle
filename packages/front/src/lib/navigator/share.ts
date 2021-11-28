export const canUseShare = () => "share" in navigator

export const shareAPI = async (data: { title: string; text: string; url: string }) => {
  await navigator.share(data)
}
