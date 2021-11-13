import type { FastifyPluginAsync } from "fastify"
import deleteWordStampController from "./delete"

const wordStampDetailController: FastifyPluginAsync = async (server) => {
  server.register(deleteWordStampController)
}

export default wordStampDetailController
