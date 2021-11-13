import { FastifyPluginAsync } from "fastify"
import getOwnedBookDetailController from "./get"
import hook from "./hook"
import putOwnedBookDetailController from "./put"

const ownedBookDetailController: FastifyPluginAsync = async (server) => {
  hook(server, {})
  server.register(putOwnedBookDetailController)
  server.register(getOwnedBookDetailController)
}

export default ownedBookDetailController
