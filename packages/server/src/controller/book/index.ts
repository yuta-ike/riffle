import type { FastifyPluginAsync } from "fastify"
import bookDetailController from "./[bookId]"

const bookController: FastifyPluginAsync = async (server) => {
  server.register(bookDetailController)
}

export default bookController
