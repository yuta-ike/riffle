import { GetServerSidePropsContext } from "next"
import nookies from "nookies"
import app, { authAuth as firebaseAuth } from "."

export const verifyIdToken = async (req: GetServerSidePropsContext) => {
  const token = nookies.get(req).token
  if (token == null) {
    return null
  }
  try {
    await firebaseAuth.verifyIdToken(token)
    return token
  } catch (e) {
    console.error(e)
    return null
  }
}
