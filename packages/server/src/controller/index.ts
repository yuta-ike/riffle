import { FastifyPluginAsync } from "fastify"
import bookController from "./book"
import authController from "./auth"
import ownedBookController from "./owned-book"
import postVerifyInviteCodeController from "./verify-invite-code/post"

const rootController: FastifyPluginAsync = async (server) => {
  server.register(ownedBookController)
  server.register(bookController)
  server.register(authController)
  server.register(postVerifyInviteCodeController)
}

export default rootController
