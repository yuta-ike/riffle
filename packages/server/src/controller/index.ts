import { FastifyPluginAsync } from "fastify"
import bookController from "./book"
import authController from "./auth"
import ownedBookController from "./owned-book"

const rootController: FastifyPluginAsync = async (server) => {
  server.register(ownedBookController)
  server.register(bookController)
  server.register(authController)
}

export default rootController
