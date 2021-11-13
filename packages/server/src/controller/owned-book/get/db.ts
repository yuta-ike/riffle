import prisma from "../../../lib/prisma"
import { prismaOwnedBookQuery } from "../../../mapper/ownedBook"

const getOwnedBooks = async (userId: string) => {
  const ownedBooks = await prisma.ownedBook.findMany({
    where: {
      userId,
      deletedAt: null,
    },
    ...prismaOwnedBookQuery(userId),
  })
  return ownedBooks
}

export default getOwnedBooks
