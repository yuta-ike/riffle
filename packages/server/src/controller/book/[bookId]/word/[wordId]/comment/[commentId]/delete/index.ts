import { FastifyPluginAsync } from "fastify"
import deleteComment from "./db"

const deleteCommentController: FastifyPluginAsync = async (server) => {
  server.delete<"delete", "/book/:bookId/comment/:commentId">("/book/:bookId/comment/:commentId", async (req) => {
    // TODO: 本人確認
    await deleteComment(req.params.commentId)
    return
  })
}

export default deleteCommentController
