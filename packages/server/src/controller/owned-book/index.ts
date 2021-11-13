import type { FastifyPluginAsync } from "fastify"
import getOwnedBookController from "./get"
import postOwnedBookController from "./post"
import ownedBookDetailController from "./[bookId]"

const ownedBookController: FastifyPluginAsync = async (server) => {
  server.register(ownedBookDetailController)
  server.register(postOwnedBookController)
  server.register(getOwnedBookController)
}

export default ownedBookController
