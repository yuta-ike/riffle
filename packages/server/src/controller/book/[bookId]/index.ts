import type { FastifyPluginAsync } from "fastify"
import collaboratorsController from "./collaborators"
import commentController from "./comment"
import deleteBookDetailController from "./delete"
import scoreController from "./score"
import wordController from "./word"

const bookDetailController: FastifyPluginAsync = async (server) => {
  server.register(deleteBookDetailController)
  server.register(commentController)
  server.register(wordController)
  server.register(collaboratorsController)
  server.register(scoreController)
}

export default bookDetailController
