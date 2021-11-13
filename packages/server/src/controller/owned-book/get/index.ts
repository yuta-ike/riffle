import { FastifyPluginAsync } from "fastify"
import { ownedBookMapper } from "../../../mapper/ownedBook"
import getOwnedBooks from "./db"

const getOwnedBookController: FastifyPluginAsync = async (server) => {
  server.get<"get", "/owned-book">("/owned-book", async (req) => {
    const ownedBooks = await getOwnedBooks(req.authUser.id)

    return {
      ownedBooks: ownedBooks.map(ownedBookMapper).filter(({ deletedAt }) => deletedAt == null),
    }
  })
}

export default getOwnedBookController
