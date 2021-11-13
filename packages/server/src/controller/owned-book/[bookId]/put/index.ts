import { FastifyPluginAsync } from "fastify"
import prisma from "../../../../lib/prisma"
import { ownedBookDetailMapper } from "../../../../mapper/ownedBookDetail"
import { patchOwnedBookDetail, patchOwnedBookDetailFavorite } from "./db"
import hook from "./hook"

const putOwnedBookDetailController: FastifyPluginAsync = async (server) => {
  hook(server, {})
  server.put<"put", "/owned-book/:bookId">("/owned-book/:bookId", async (req) => {
    const prismaPromise = []
    if (req.body.isFavorite !== undefined) {
      prismaPromise.push(patchOwnedBookDetailFavorite("dummy-user-id", req.params.bookId, req.body.isFavorite))
    }
    if (req.body.category !== undefined || req.body.description !== undefined || req.body.title !== undefined) {
      prismaPromise.push(patchOwnedBookDetail("dummy-user-id", req.params.bookId, req.body))
    }
    const res = await prisma.$transaction(prismaPromise)

    const result = res?.[res.length - 1]

    if (result == null) {
      throw new Error()
    }

    return {
      ownedBook: ownedBookDetailMapper(result),
    }
  })
}

export default putOwnedBookDetailController
