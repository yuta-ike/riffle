import prisma from "../../../../../lib/prisma"
import { prismaWordQuery } from "../../../../../mapper/word"

type PostWordParams = {
  question: string
  answer: string
  order?: number
}

const postWord = async (userId: string, bookId: string, { question, answer, order }: PostWordParams) => {
  // TODO: 途中挿入の場合
  const word = await prisma.word.create({
    data: {
      question,
      answer,
      order,
      userId,
      bookId,
    },
    ...prismaWordQuery(),
  })
  return word
}

export default postWord
