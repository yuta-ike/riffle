import type { FastifyPluginAsync } from "fastify"
import postAuthController from "./post"
import putAuthController from "./put"

const authController: FastifyPluginAsync = async (server) => {
  server.register(postAuthController)
  server.register(putAuthController)
}

export default authController
