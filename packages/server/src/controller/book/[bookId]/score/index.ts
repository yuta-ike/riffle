import type { FastifyPluginAsync } from "fastify"
import postScoreController from "./post"

const scoreController: FastifyPluginAsync = async (server) => {
  server.register(postScoreController)
}

export default scoreController
