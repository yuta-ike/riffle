import prisma from "../../../../lib/prisma"
import { prismaOwnedBookDetailQuery } from "../../../../mapper/ownedBookDetail"

const getOwnedBookDetail = async (userId: string, bookId: number) => {
  const ownedBook = await prisma.ownedBook.findFirst({
    where: {
      id: bookId,
      userId,
    },
    ...prismaOwnedBookDetailQuery(userId),
  })
  return ownedBook
}

export default getOwnedBookDetail
