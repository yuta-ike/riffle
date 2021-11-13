import { FastifyPluginAsync } from "fastify"
import deleteStamp from "./db"

const deleteStampController: FastifyPluginAsync = async (server) => {
  server.delete<"delete", "/book/:bookId/comment/:commentId/stamp/:stampId">(
    "/book/:bookId/comment/:commentId/stamp/:stampId",
    async (req) => {
      // TODO: 本人確認
      await deleteStamp("dummy-user-id", req.params.stampId)
    },
  )
}

export default deleteStampController
