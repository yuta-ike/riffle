import { FastifyPluginAsync } from "fastify"
import putAuth from "./db"

const putAuthController: FastifyPluginAsync = async (server) => {
  server.put<"put", "/auth">("/auth", async (req) => {
    const user = await putAuth("dummy-user-id", req.body)
    return {
      user,
    }
  })
}

export default putAuthController
