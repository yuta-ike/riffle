import type { FastifyPluginAsync } from "fastify"
import deleteStampController from "./delete"
import hook from "./hook"

const stampDetailController: FastifyPluginAsync = async (server) => {
  hook(server, {})
  server.register(deleteStampController)
}

export default stampDetailController
