import { Prisma } from "@prisma/client"
import { components } from "../types/generated/schema"

export const prismaCollaboratorRequestQuery = () /*: Omit<Prisma.CollaboratorRequestCreateArgs, "data">*/ =>
  ({
    include: {
      Book: {
        include: {
          User: true,
        },
      },
      User: true,
    },
  } as const)

type QueryType = ReturnType<typeof prismaCollaboratorRequestQuery>

export const collaboratorRequestMapper = (
  collaboratorRequest: Prisma.CollaboratorRequestGetPayload<QueryType>,
): components["schemas"]["CollaboratorRequest"] => ({
  ...collaboratorRequest,
  createdAt: collaboratorRequest.createdAt.toISOString(),
  book: {
    ...collaboratorRequest.Book,
    description: collaboratorRequest.Book.description ?? undefined,
    createdAt: collaboratorRequest.Book.createdAt.toISOString(),
    updatedAt: collaboratorRequest.Book.updatedAt?.toISOString(),
    author: collaboratorRequest.Book.User,
    words: [],
    comments: [],
    collaborators: [],
    wordScores: [],
  },
})
