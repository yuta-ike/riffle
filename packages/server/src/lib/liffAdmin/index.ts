import axios from "axios"
import { URLSearchParams } from "url"

const LIFF_VERIFY_API_URL = process.env.LIFF_VERIFY_API_URL ?? ""
const LIFF_CLIENT_ID = process.env.LIFF_CLIENT_ID ?? ""

const verifyIdToken = async (idToken: string) => {
  try {
    const params = new URLSearchParams()
    params.append("id_token", idToken) // 渡したいデータ分だけappendする
    params.append("client_id", LIFF_CLIENT_ID)
    const res = await axios.post<{ sub: string; picture?: string; name?: string }>(LIFF_VERIFY_API_URL, params)
    return {
      id: res.data.sub,
      iconUrl: res.data?.picture ?? "",
      name: res.data?.name ?? "Unknown",
    }
  } catch (e) {
    console.log(e)
    throw e
  }
}

export default verifyIdToken
