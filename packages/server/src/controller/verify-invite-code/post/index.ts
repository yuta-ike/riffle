import { FastifyPluginAsync } from "fastify"
import { bookSummaryMapper } from "../../../mapper/bookSummary"
import getBookWithInviteCode from "./db"

const postVerifyInviteCodeController: FastifyPluginAsync = async (server) => {
  server.post<"post", "/verify-invite-code">("/verify-invite-code", async function (req, reply) {
    const res = await getBookWithInviteCode(req.body.inviteCode)

    if (res == null) {
      throw new Error("Not Found")
    }
    console.log({
      bookSummary: bookSummaryMapper(res.Book),
      expired: res.expireDate != null,
      deauthorized: res.deauthorizedAt != null,
      inviterUser: res.InviterUser,
    })

    // reply.sent = true

    reply.send({
      bookSummary: bookSummaryMapper(res.Book),
      expired: res.expireDate != null,
      deauthorized: res.deauthorizedAt != null,
      inviterUser: res.InviterUser,
    })
    // return reply
  })
}

export default postVerifyInviteCodeController
