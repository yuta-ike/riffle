import { FastifyPluginAsync } from "fastify"
import getOwnedBookDetail from "./db"
import { ownedBookDetailMapper } from "../../../../mapper/ownedBookDetail"

const getOwnedBookDetailController: FastifyPluginAsync = async (server) => {
  server.get<"get", "/owned-book/:bookId">("/owned-book/:bookId", async (req) => {
    const ownedBook = await getOwnedBookDetail(req.authUser.id, req.params.bookId)
    if (ownedBook == null) {
      throw new Error("Not Found")
    }
    return {
      ownedBook: ownedBookDetailMapper(ownedBook),
    }
  })
}

export default getOwnedBookDetailController
