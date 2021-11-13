import type { FastifyPluginAsync } from "fastify"
import invitedController from "./invited"
import inviteCodeController from "./invite-code"
import collaboratorDetailController from "./[collaboratorId]"
import collaboratorRequestController from "./request"

const collaboratorsController: FastifyPluginAsync = async (server) => {
  server.register(inviteCodeController)
  server.register(invitedController)
  server.register(collaboratorDetailController)
  server.register(collaboratorRequestController)
}

export default collaboratorsController
