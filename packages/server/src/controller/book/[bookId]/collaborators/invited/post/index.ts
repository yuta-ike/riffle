import { FastifyPluginAsync } from "fastify"
import { deauthorizedCheck, acceptInviteAndCreateCollaborator, denyInvite } from "./db"

const postInvitedController: FastifyPluginAsync = async (server) => {
  server.post<"post", "/book/:bookId/collaborators/invited">("/book/:bookId/collaborators/invited", async (req) => {
    const checkResult = await deauthorizedCheck(req.body.inviteCode)
    if (checkResult === "ALREADY_USED") {
      new Error("招待コードが既に使われています")
    }
    if (checkResult === "EXPIRED") {
      new Error("招待コードが期限切れです")
    }

    if (req.body.accept) {
      await acceptInviteAndCreateCollaborator("dummy-user-id", req.params.bookId, req.body.inviteCode)
    } else {
      await denyInvite("dummy-user-id", req.body.inviteCode)
    }
  })
}

export default postInvitedController
