import axios from "axios"

const LIFF_VERIFY_API_URL = process.env.LIFF_VERIFY_API_URL ?? ""
const LIFF_CLIENT_ID = process.env.LIFF_CLIENT_ID ?? ""

const verifyIdToken = async (idToken: string) => {
  const res = await axios.post<{ sub: string; picture?: string; name?: string }>(LIFF_VERIFY_API_URL, {
    idToken,
    clientId: LIFF_CLIENT_ID,
  })
  return {
    id: res.data.sub,
    iconUrl: res.data?.picture ?? "",
    name: res.data?.name ?? "Unknown",
  }
}

export default verifyIdToken
