import { FastifyPluginAsync } from "fastify"
import getInviteCode from "./db"

const publishInviteCodeController: FastifyPluginAsync = async (server) => {
  server.post<"post", "/book/:bookId/collaborators/invite-code">(
    "/book/:bookId/collaborators/invite-code",
    async (req) => {
      const inviteCode = await getInviteCode(req.authUser.id, req.params.bookId, req.body.role)
      return {
        inviteCode,
      }
    },
  )
}

export default publishInviteCodeController
