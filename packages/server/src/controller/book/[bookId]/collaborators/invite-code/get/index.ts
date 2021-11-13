import { FastifyPluginAsync } from "fastify"
import getInviteCode from "./db"

const getInviteCodeController: FastifyPluginAsync = async (server) => {
  server.get<"get", "/book/:bookId/collaborators/invite-code">(
    "/book/:bookId/collaborators/invite-code",
    async (req) => {
      const inviteCodes = await getInviteCode("dummy-user-id", req.params.bookId)
      return {
        inviteCodes: inviteCodes.map((inviteCode) => ({
          expireDate: inviteCode.expireDate.toISOString(),
          inviteCode: inviteCode.inviteCode,
          role: inviteCode.role,
          deauthorizedAt: inviteCode.deauthorizedAt?.toISOString(),
          accepted: inviteCode.accepted ?? undefined,
        })),
      }
    },
  )
}

export default getInviteCodeController
