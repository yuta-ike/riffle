import { FastifyPluginAsync } from "fastify"
import { wordMapper } from "../../../../../../../mapper/word"
import putWordStatus from "./db"

const putWordStatusController: FastifyPluginAsync = async (server) => {
  server.put<"put", "/book/:bookId/word/:wordId/status">("/book/:bookId/word/:wordId/status", async (req) => {
    const word = await putWordStatus("dummy-user-id", req.params.wordId, req.body)

    return {
      word: wordMapper(word),
    }
  })
}

export default putWordStatusController
