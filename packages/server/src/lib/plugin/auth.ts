import { FastifyPluginAsync } from "fastify"
import verifyIdToken from "../liffAdmin"

const authPlugin: FastifyPluginAsync = async (server) => {
  server.decorateRequest("authUser", null)

  server.addHook("onRequest", async (req) => {
    if (req.headers.authorization == null || !req.headers.authorization.startsWith("Bearer ")) {
      throw new Error("Unauthorized")
    }
    const idToken = req.headers.authorization.slice("Bearer ".length)
    const user = await verifyIdToken(idToken)
    req.authUser = user
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
