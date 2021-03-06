import { FastifyPluginAsync } from "fastify"
import deleteBookDetail from "./db"

const deleteBookDetailController: FastifyPluginAsync = async (server) => {
  server.delete<"delete", "/book/:bookId">("/book/:bookId", async (req) => {
    await deleteBookDetail(req.authUser.id, req.params.bookId)
    return
  })
}

export default deleteBookDetailController
