import type { FastifyPluginAsync } from "fastify"
import postWordStampController from "./post"
import wordStampDetailController from "./[stampId]"

const wordStampController: FastifyPluginAsync = async (server) => {
  server.register(postWordStampController)
  server.register(wordStampDetailController)
}

export default wordStampController
