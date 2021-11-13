import { AccessLevel } from "@prisma/client"
import { Category } from "@prisma/client"
import prisma from "../../../lib/prisma"
import { prismaOwnedBookQuery } from "../../../mapper/ownedBook"

export type PostBookParams = {
  title: string
  category: Category
  description?: string
  authorId: string
  accessLevel: AccessLevel
  words: { question: string; answer: string }[]
}

const postBook = async ({ title, category, description, authorId, accessLevel, words }: PostBookParams) => {
  // 本を追加
  const ownedBook = await prisma.ownedBook.create({
    data: {
      type: "own",
      role: "owner",
      accessLevel,
      User: {
        connect: {
          id: authorId,
        },
      },
      Book: {
        create: {
          title,
          category,
          description,
          accessLevel,
          authorId,
          Word: {
            createMany: {
              data: words.map(({ question, answer }, index) => ({
                question,
                answer,
                order: index + 1,
                userId: authorId,
              })),
            },
          },
        },
      },
    },
    ...prismaOwnedBookQuery(authorId),
  })
  return ownedBook
}

export default postBook
