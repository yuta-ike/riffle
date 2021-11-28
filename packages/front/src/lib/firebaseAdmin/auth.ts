import { getAuth } from "firebase-admin/auth"
import { GetServerSidePropsContext } from "next"
import nookies from "nookies"
import adminApp from "."

export const verifyIdToken = async (req: GetServerSidePropsContext) => {
  const token = nookies.get(req).token
  if (token == null) {
    return null
  }
  try {
    await getAuth(adminApp).verifyIdToken(token)
    return token
  } catch (e) {
    console.error(e)
    return null
  }
}
