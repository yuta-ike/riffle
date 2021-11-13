import prisma from "../../../../../../lib/prisma"

const deleteWord = async (userId: string, wordId: number) => {
  await prisma.word.update({
    where: {
      id: wordId,
    },
    data: {
      deletedAt: new Date(),
    },
  })
}

export default deleteWord
