import { FastifyPluginAsync } from "fastify"
import { stampMapper } from "../../../../../../../../../mapper/stamp"
import postWordStamp from "./db"

const postWordStampController: FastifyPluginAsync = async (server) => {
  server.post<"post", "/book/:bookId/word/:wordId/comment/:commentId/stamp">(
    "/book/:bookId/word/:wordId/comment/:commentId/stamp",
    async (req) => {
      const stamp = await postWordStamp(req.authUser.id, req.params.commentId, req.body.stampType)
      return {
        stamp: stampMapper(stamp),
      }
    },
  )
}

export default postWordStampController
