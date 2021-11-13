import type { FastifyPluginAsync } from "fastify"
import deleteStampController from "./delete"

const stampDetailController: FastifyPluginAsync = async (server) => {
  server.register(deleteStampController)
}

export default stampDetailController
