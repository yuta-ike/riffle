import { FastifyPluginAsync } from "fastify"
import deleteWord from "./db"

const deleteWordController: FastifyPluginAsync = async (server) => {
  server.delete<"delete", "/book/:bookId/word/:wordId">("/book/:bookId/word/:wordId", async (req) => {
    await deleteWord(req.authUser.id, req.params.wordId)
  })
}

export default deleteWordController
