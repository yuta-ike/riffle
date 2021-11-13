import prisma from "../../../../../../lib/prisma"
import { prismaWordQuery } from "../../../../../../mapper/word"

type PutWordParams = {
  question?: string
  answer?: string
  order?: number
}

const putWord = async (userId: string, wordId: number, { question, answer, order }: PutWordParams) => {
  const word = await prisma.word.update({
    where: {
      id: wordId,
    },
    data: {
      question,
      answer,
      order,
    },
    ...prismaWordQuery(),
  })
  return word
}

export default putWord
