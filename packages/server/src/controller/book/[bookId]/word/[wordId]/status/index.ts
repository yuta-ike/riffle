import type { FastifyPluginAsync } from "fastify"
import putWordStatusController from "./put"

const wordstatusController: FastifyPluginAsync = async (server) => {
  server.register(putWordStatusController)
}

export default wordstatusController
