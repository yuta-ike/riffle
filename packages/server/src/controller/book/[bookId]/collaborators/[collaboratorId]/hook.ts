import { FastifyPluginAsync } from "fastify"

const hook: FastifyPluginAsync = async (server) => {
  server.addHook<{ Params: { collaboratorId: string } }>("onRequest", async (req) => {
    const parsedCollaboratorId = parseInt(req.params.collaboratorId, 10)
    if (Number.isNaN(parsedCollaboratorId)) {
      throw new Error()
    }
    // @ts-ignore
    req.params["collaboratorId"] = parsedCollaboratorId
  })
}
export default hook
