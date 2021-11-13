import type { FastifyPluginAsync } from "fastify"
import acceptInviteController from "./post"

const invitedController: FastifyPluginAsync = async (server) => {
  server.register(acceptInviteController)
}

export default invitedController
