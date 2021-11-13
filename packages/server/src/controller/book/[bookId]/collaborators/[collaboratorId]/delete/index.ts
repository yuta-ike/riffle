import { FastifyPluginAsync } from "fastify"
import deleteCollaborator from "./db"

const deleteCollaboratorController: FastifyPluginAsync = async (server) => {
  server.delete<"delete", "/book/:bookId/collaborators/:collaboratorId">(
    "/book/:bookId/collaborators/:collaboratorId",
    async (req) => {
      await deleteCollaborator(req.params.collaboratorId)
    },
  )
}

export default deleteCollaboratorController
