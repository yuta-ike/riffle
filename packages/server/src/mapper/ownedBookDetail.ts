import { Prisma } from "@prisma/client"
import { components } from "../types/generated/schema"

export const prismaOwnedBookDetailQuery = (userId: string) /*: Omit<Prisma.OwnedBookCreateArgs, "data">*/ =>
  ({
    include: {
      Book: {
        include: {
          User: true,
          Collaborator: {
            include: {
              User: true,
            },
          },
          CollaboratorRequest: true,
          Comment: {
            include: {
              User: true,
              Stamp: {
                include: {
                  User: true,
                },
                orderBy: {
                  createdAt: "desc",
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          },
          Word: {
            where: {
              deletedAt: null,
            },
            include: {
              Comment: {
                include: {
                  User: true,
                  Stamp: {
                    include: {
                      User: true,
                    },
                    orderBy: {
                      createdAt: "desc",
                    },
                  },
                },
                orderBy: {
                  createdAt: "desc",
                },
              },
              User: true,
              WordDetail: {
                where: {
                  userId,
                },
              },
              WordScore: {
                where: {
                  userId,
                },
                orderBy: {
                  createdAt: "desc",
                },
              },
            },
          },
        },
      },
      User: true,
    },
  } as const)

type QueryType = ReturnType<typeof prismaOwnedBookDetailQuery>

export const ownedBookDetailMapper = (
  ownedBook: Prisma.OwnedBookGetPayload<QueryType>,
): components["schemas"]["OwnedBook"] => ({
  ...ownedBook,
  createdAt: ownedBook.createdAt.toISOString(),
  updatedAt: ownedBook.updatedAt?.toISOString(),
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
    words: ownedBook.Book.Word.map((word) => ({
      ...word,
      createdAt: word.createdAt.toISOString(),
      updatedAt: word.updatedAt?.toISOString(),
      done: word.WordDetail?.[0]?.done ?? false,
      flags: word.WordDetail?.[0]?.flags ?? [],
      author: word.User,
      comments: word.Comment.map((comment) => ({
        ...comment,
        author: comment.User,
        createdAt: comment.createdAt.toISOString(),
        stamps: comment.Stamp.map((stamp) => ({
          ...stamp,
          author: stamp.User,
          createdAt: stamp.createdAt.toISOString(),
        })),
      })),
    })),
    comments: ownedBook.Book.Comment.map((comment) => ({
      ...comment,
      author: comment.User,
      createdAt: comment.createdAt.toISOString(),
      stamps: comment.Stamp.map((stamp) => ({
        ...stamp,
        author: stamp.User,
        createdAt: stamp.createdAt.toISOString(),
      })),
    })),
    collaborators: ownedBook.Book.Collaborator.map((collaborator) => ({
      ...collaborator,
      user: collaborator.User,
    })),
    // TODO: sort
    wordScores: ownedBook.Book.Word.map(({ id: wordId, WordScore }) =>
      WordScore.map((score) => ({
        id: score.id,
        wordId,
        result: score.result,
        createdAt: score.createdAt.toISOString(),
      })),
    )
      .flat()
      .sort(
        (wordScoreA, wordScoreB) => new Date(wordScoreA.createdAt).getTime() - new Date(wordScoreB.createdAt).getTime(),
      ),
  },
})
