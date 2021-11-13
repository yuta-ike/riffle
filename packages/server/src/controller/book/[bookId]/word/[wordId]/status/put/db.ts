import prisma from "../../../../../../../lib/prisma"
import { prismaWordQuery } from "../../../../../../../mapper/word"

type PutWordStatusParams = {
  flags?: number[]
  done?: boolean
}

const putWordStatus = async (userId: string, wordId: number, { flags, done }: PutWordStatusParams) => {
  const word = await prisma.wordDetail.update({
    where: {
      wordId_userId: {
        wordId,
        userId,
      },
    },
    data: {
      // TODO: 配列結合
      flags,
      done,
    },
    select: {
      Word: {
        ...prismaWordQuery(),
      },
    },
  })
  return word.Word
}

export default putWordStatus
