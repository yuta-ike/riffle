import type { FastifyPluginAsync } from "fastify"
import deleteCommentController from "./delete"
import stampController from "./stamp"

const commentDetailController: FastifyPluginAsync = async (server) => {
  server.register(deleteCommentController)
  server.register(stampController)
}

export default commentDetailController
