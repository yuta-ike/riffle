import type { FastifyPluginAsync } from "fastify"
import deleteWordCommentController from "./delete"
import wordStampController from "./stamp"

const wordCommentDetailController: FastifyPluginAsync = async (server) => {
  server.register(deleteWordCommentController)
  server.register(wordStampController)
}

export default wordCommentDetailController
