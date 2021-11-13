import prisma from "../../../../lib/prisma"

const deleteBookDetail = async (userId: string, bookId: string) => {
  const deletedAt = new Date()
  // NOTE: 権限チェック
  await prisma.$transaction([
    prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        deletedAt,
      },
    }),
    prisma.ownedBook.updateMany({
      where: {
        Book: {
          id: bookId,
        },
      },
      data: {
        deletedAt,
      },
    }),
    // TODO: 他に何を消すか・消さないか考える
  ])
}

export default deleteBookDetail
