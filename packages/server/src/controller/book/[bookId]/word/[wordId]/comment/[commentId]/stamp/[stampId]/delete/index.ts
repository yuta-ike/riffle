import { FastifyPluginAsync } from "fastify"
import deleteWordStamp from "./db"

const deleteStampController: FastifyPluginAsync = async (server) => {
  server.delete<"delete", "/book/:bookId/word/:wordId/comment/:commentId/stamp/:stampId">(
    "/book/:bookId/word/:wordId/comment/:commentId/stamp/:stampId",
    async (req) => {
      // TODO: 本人確認
      await deleteWordStamp(req.authUser.id, req.params.stampId)
    },
  )
}

export default deleteStampController
