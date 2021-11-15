import { FastifyPluginAsync } from "fastify"

const hook: FastifyPluginAsync = async (server) => {
  server.addHook<{ Params: { wordId: string } }>("onRequest", async (req) => {
    const parsedBookId = parseInt(req.params.wordId, 10)
    if (Number.isNaN(parsedBookId)) {
      throw new Error()
    }
    // @ts-ignore
    req.params["wordId"] = parsedBookId
  })
}
export default hook
