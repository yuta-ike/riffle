import type { FastifyPluginAsync } from "fastify"
import postWordController from "./post"
import wordDetailController from "./[wordId]"

const wordController: FastifyPluginAsync = async (server) => {
  server.register(postWordController)
  server.register(wordDetailController)
}

export default wordController
