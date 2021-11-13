import type { FastifyPluginAsync } from "fastify"
import wordCommentDetailController from "./[commentId]"
import postWordCommentController from "./post"

const wordCommentController: FastifyPluginAsync = async (server) => {
  server.register(postWordCommentController)
  server.register(wordCommentDetailController)
}

export default wordCommentController
