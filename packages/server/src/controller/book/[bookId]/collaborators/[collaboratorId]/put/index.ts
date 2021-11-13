import { FastifyPluginAsync } from "fastify"
import { collaboratorMapper } from "../../../../../../mapper/collaborator"
import putCollaborator from "./db"

const putCollaboratorController: FastifyPluginAsync = async (server) => {
  server.put<"put", "/book/:bookId/collaborators/:collaboratorId">(
    "/book/:bookId/collaborators/:collaboratorId",
    async (req) => {
      const collaborator = await putCollaborator(req.authUser.id, req.params.collaboratorId, req.body.role)

      return {
        collaborator: collaboratorMapper(collaborator),
      }
    },
  )
}

export default putCollaboratorController
