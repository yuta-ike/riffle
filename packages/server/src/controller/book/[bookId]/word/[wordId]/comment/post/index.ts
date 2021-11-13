import { FastifyPluginAsync } from "fastify"
import { commentMapper } from "../../../../../../../mapper/comment"
import postWordComment from "./db"

const postWordCommentController: FastifyPluginAsync = async (server) => {
  server.post<"post", "/book/:bookId/word/:wordId/comment">("/book/:bookId/word/:wordId/comment", async (req) => {
    const comment = await postWordComment(req.authUser.id, req.params.wordId, req.body)

    return {
      comment: commentMapper(comment),
    }
  })
}

export default postWordCommentController
