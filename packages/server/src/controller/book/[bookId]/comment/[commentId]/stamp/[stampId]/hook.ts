import { FastifyPluginAsync } from "fastify"

const hook: FastifyPluginAsync = async (server) => {
  server.addHook<{ Params: { stampId: string } }>("onRequest", async (req) => {
    const parsedStampId = parseInt(req.params.stampId, 10)
    if (Number.isNaN(parsedStampId)) {
      throw new Error()
    }
    // @ts-ignore
    req.params["stampId"] = parsedStampId
  })
}
export default hook
