import type { FastifyPluginAsync } from "fastify"
import getInviteCodeController from "./get"
import publishInviteCodeController from "./post"

const inviteCodeController: FastifyPluginAsync = async (server) => {
  server.register(publishInviteCodeController)
  server.register(getInviteCodeController)
}

export default inviteCodeController
