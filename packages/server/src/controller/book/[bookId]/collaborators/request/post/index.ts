import { FastifyPluginAsync } from "fastify"
import { collaboratorRequestMapper } from "../../../../../../mapper/collaboratorRequest"
import postCollaboratorRequest from "./db"

const postCollaboratorRequestController: FastifyPluginAsync = async (server) => {
  server.post<"post", "/book/:bookId/collaborators/request">("/book/:bookId/collaborators/request", async (req) => {
    const collaboratorRequest = await postCollaboratorRequest("dummy-user-id", req.params.bookId)

    return {
      collaboratorRequest: collaboratorRequestMapper(collaboratorRequest),
    }
  })
}

export default postCollaboratorRequestController
