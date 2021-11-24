import { FastifyPluginAsync } from "fastify"
import { auth } from "../../../lib/firebase"
import verifyIdToken from "../../../lib/liffAdmin"
import postLogin from "./db"

const createOrGetFirebaseUser = async (uid: string, name: string, iconUrl: string) => {
  try {
    return await auth.getUser(uid)
  } catch (e) {
    if (e?.errorInfo?.code === "auth/user-not-found") {
      return await auth.createUser({
        uid,
        displayName: name,
        photoURL: iconUrl,
      })
    }
    console.log(e)
    throw e
  }
}

const postLoginController: FastifyPluginAsync = async (server) => {
  server.post<"post", "/auth">("/auth", async (req) => {
    const liffUser = await verifyIdToken(req.headers.authorization?.slice("Bearer ".length) ?? "")
    const uid = `line:${liffUser.id}`

    const firebaseUser = await createOrGetFirebaseUser(uid, liffUser.name, liffUser.iconUrl)
    const token = await auth.createCustomToken(firebaseUser.uid)
    const riffleUser = await postLogin(firebaseUser.uid, {
      iconUrl: liffUser.iconUrl ?? "",
      name: liffUser.name ?? "",
    })
    return {
      user: riffleUser,
      token,
    }
  })
}

export default postLoginController
