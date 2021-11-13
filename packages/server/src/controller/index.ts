import { FastifyPluginAsync } from "fastify"
import bookController from "./book"
import ownedBookController from "./owned-book"

const rootController: FastifyPluginAsync = async (server) => {
  server.register(ownedBookController)
  server.register(bookController)
}

export default rootController
