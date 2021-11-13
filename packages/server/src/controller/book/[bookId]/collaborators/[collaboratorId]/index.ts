import type { FastifyPluginAsync } from "fastify"
import deleteCollaboratorController from "./delete"
import hook from "./hook"
import putCollaboratorController from "./put"

const collaboratorDetailController: FastifyPluginAsync = async (server) => {
  hook(server, {})
  server.register(putCollaboratorController)
  server.register(deleteCollaboratorController)
}

export default collaboratorDetailController
