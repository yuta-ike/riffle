import { FastifyPluginAsync } from "fastify"
import { stampMapper } from "../../../../../../../mapper/stamp"
import postStamp from "./db"

const postStampController: FastifyPluginAsync = async (server) => {
  server.post<"post", "/book/:bookId/comment/:commentId/stamp">(
    "/book/:bookId/comment/:commentId/stamp",
    async (req) => {
      const stamp = await postStamp(req.authUser.id, req.params.commentId, req.body.stampType)
      return {
        stamp: stampMapper(stamp),
      }
    },
  )
}

export default postStampController
