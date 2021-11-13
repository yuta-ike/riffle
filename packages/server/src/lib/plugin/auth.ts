import { FastifyPluginAsync } from "fastify"
import { auth } from "../firebase"
// import verifyIdToken from "../liffAdmin"

const authPlugin: FastifyPluginAsync = async (server) => {
  server.decorateRequest("authUser", null)

  server.addHook("onRequest", async (req) => {
    if (req.headers.authorization == null || !req.headers.authorization.startsWith("Bearer ")) {
      throw new Error("Unauthorized")
    }
    if (req.method === "POST" && req.url === "/auth") {
      return
    }

    const idToken = req.headers.authorization.slice("Bearer ".length)
    // if (req.method === "POST" && req.url === "/auth") {
    //   // LIFF: ログインAPIのみ
    //   const user = await verifyIdToken(idToken)
    //   req.authUser = user
    // } else {
    // Firebase: ログイン以外のAPI
    const decoded = await auth.verifyIdToken(idToken)
    const firebaseUser = await auth.getUser(decoded.uid)
    req.authUser = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName ?? "",
      iconUrl: firebaseUser.photoURL ?? "",
    }
    // }
  })
}

export default authPlugin

declare module "fastify" {
  interface FastifyRequest {
    authUser: {
      id: string
      name: string
      iconUrl: string
    }
  }
}
