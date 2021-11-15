import type { FastifyPluginAsync } from "fastify"
import wordCommentController from "./comment"
import deleteWordController from "./delete"
import hook from "./hook"
import putWordController from "./put"
import wordStatusController from "./status"

const wordDetailController: FastifyPluginAsync = async (server) => {
  hook(server, {})
  server.register(deleteWordController)
  server.register(putWordController)
  server.register(wordStatusController)
  server.register(wordCommentController)
}

export default wordDetailController
