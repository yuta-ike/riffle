import type { FastifyPluginAsync } from "fastify"
import commentDetailController from "./[commentId]"
import postCommentController from "./post"

const commentController: FastifyPluginAsync = async (server) => {
  server.register(postCommentController)
  server.register(commentDetailController)
}

export default commentController
