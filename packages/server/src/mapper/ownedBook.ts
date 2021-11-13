import { Prisma } from "@prisma/client"
import { components } from "../types/generated/schema"

export const prismaOwnedBookQuery = (userId: string) /*: Omit<Prisma.OwnedBookCreateArgs, "data">*/ =>
  ({
    include: {
      Book: {
        include: {
          User: true,
          Collaborator: true,
          CollaboratorRequest: true,
          Comment: true,
          Word: {
            where: {
              deletedAt: null,
            },
            include: {
              WordDetail: {
                where: {
                  userId,
                },
              },
              WordScore: {
                where: {
                  userId,
                },
              },
            },
          },
        },
      },
      User: true,
    },
  } as const)

type QueryType = ReturnType<typeof prismaOwnedBookQuery>

export const ownedBookMapper = (
  ownedBook: Prisma.OwnedBookGetPayload<QueryType>,
): components["schemas"]["OwnedBook"] & { deletedAt?: string } => ({
  ...ownedBook,
  createdAt: ownedBook.createdAt.toISOString(),
  updatedAt: ownedBook.updatedAt?.toISOString(),
  deletedAt: ownedBook.deletedAt?.toISOString(),
  lastUsedAt: new Date(
    ownedBook.Book.Word.reduce((max, { WordScore }) => {
      const maxDateWordScore = WordScore.reduce(
        (max, { createdAt }) => (new Date(max).getTime() < createdAt.getTime() ? createdAt.getTime() : max),
        0,
      )
      return max < maxDateWordScore ? maxDateWordScore : max
    }, 0),
  ).toISOString(),
  statistics: {
    done: ownedBook.Book.Word.reduce(
      (sum, { WordDetail }) => sum + (WordDetail.length > 0 ? (WordDetail[0]?.done === true ? 1 : 0) : 0),
      0,
    ),
  },
  book: {
    ...ownedBook.Book,
    description: ownedBook.Book.description ?? undefined,
    author: ownedBook.User,
    createdAt: ownedBook.Book.createdAt.toISOString(),
    updatedAt: ownedBook.Book.updatedAt?.toISOString(),
    words: [],
    comments: [],
    collaborators: [],
    wordScores: [],
  },
})
