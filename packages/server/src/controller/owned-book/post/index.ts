import { FastifyPluginAsync } from "fastify"
import { ownedBookMapper } from "../../../mapper/ownedBook"
import postBook from "./db"

const postOwnedBookController: FastifyPluginAsync = async (server) => {
  server.post<"post", "/owned-book">("/owned-book", async (req) => {
    const ownedBook = await postBook({ ...req.body, authorId: "dummy-user-id" })
    return {
      ownedBook: ownedBookMapper(ownedBook),
    }
  })
}

export default postOwnedBookController
