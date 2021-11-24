import type { FastifyPluginAsync } from "fastify"
import deleteWordStampController from "./delete"
import hook from "./hook"

const wordStampDetailController: FastifyPluginAsync = async (server) => {
  hook(server, {})
  server.register(deleteWordStampController)
}

export default wordStampDetailController
