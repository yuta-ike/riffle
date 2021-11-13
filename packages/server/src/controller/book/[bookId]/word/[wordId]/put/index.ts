import { FastifyPluginAsync } from "fastify"
import { wordMapper } from "../../../../../../mapper/word"
import putWord from "./db"

const putWordController: FastifyPluginAsync = async (server) => {
  server.put<"put", "/book/:bookId/word/:wordId">("/book/:bookId/word/:wordId", async (req) => {
    // TODO: 本人確認
    const word = await putWord(req.authUser.id, req.params.wordId, req.body)

    return {
      word: wordMapper(word),
    }
  })
}

export default putWordController
