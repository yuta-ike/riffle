import { FastifyPluginAsync } from "fastify"
import { wordMapper } from "../../../../../mapper/word"
import postWord from "./db"

const postWordController: FastifyPluginAsync = async (server) => {
  server.post<"post", "/book/:bookId/word">("/book/:bookId/word", async (req) => {
    // TODO: 権限チェック
    const word = await postWord("dummy-user-id", req.params.bookId, req.body)
    return {
      word: wordMapper(word),
    }
  })
}

export default postWordController
