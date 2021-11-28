import { FastifyPluginAsync } from "fastify"
import postScore from "./db"

const postScoreController: FastifyPluginAsync = async (server) => {
  server.post<"post", "/book/:bookId/score">("/book/:bookId/score", async (req) => {
    await postScore(req.authUser.id, req.body.wordScores)
    return
  })
}

export default postScoreController
