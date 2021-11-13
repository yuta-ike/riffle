import type { FastifyPluginAsync } from "fastify"
import postCollaboratorRequest from "./post"

const collaboratorRequestController: FastifyPluginAsync = async (server) => {
  server.register(postCollaboratorRequest)
}

export default collaboratorRequestController
