import type { FastifyPluginAsync } from "fastify"
import postStampController from "./post"
import stampDetailController from "./[stampId]"

const stampController: FastifyPluginAsync = async (server) => {
  server.register(postStampController)
  server.register(stampDetailController)
}

export default stampController
