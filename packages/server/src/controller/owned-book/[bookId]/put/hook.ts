import { FastifyPluginAsync } from "fastify"
import { PutRoute } from "../../../../types/fastify"

const hook: FastifyPluginAsync = async (server) => {
  server.addHook<PutRoute<"/owned-book/:bookId">>("preHandler", async (req) => {
    console.log(req.body)
    console.log(req.params)
    console.log(req.query)
    if (
      req.body.category == null &&
      req.body.description == null &&
      req.body.isFavorite == null &&
      req.body.title == null
    ) {
      throw new Error()
    }
  })
}

export default hook
