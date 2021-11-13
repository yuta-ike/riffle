import { FastifyPluginAsync } from "fastify"
import { commentMapper } from "../../../../../mapper/comment"
import postComment from "./db"

const postCommentController: FastifyPluginAsync = async (server) => {
  server.post<"post", "/book/:bookId/comment">("/book/:bookId/comment", async (req) => {
    const comment = await postComment(req.authUser.id, req.params.bookId, req.body)

    return {
      comment: commentMapper(comment),
    }
  })
}

export default postCommentController
