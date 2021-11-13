import { FastifyPluginAsync } from "fastify"

const hook: FastifyPluginAsync = async (server) => {
  server.addHook<{ Params: { bookId: string } }>("onRequest", async (req) => {
    const parsedBookId = parseInt(req.params.bookId, 10)
    if (Number.isNaN(parsedBookId)) {
      throw new Error()
    }
    // @ts-ignore
    req.params["bookId"] = parsedBookId
  })
}
export default hook
