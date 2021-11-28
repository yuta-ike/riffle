import { Prisma } from "@prisma/client"
import { components } from "../types/generated/schema"

export const prismaBookSummaryQuery = () /*: Omit<Prisma.BookCreateArgs, "data">*/ =>
  ({
    include: {
      Word: true,
      Comment: true,
      Collaborator: true,
    },
  } as const)

type QueryType = ReturnType<typeof prismaBookSummaryQuery>

export const bookSummaryMapper = (
  bookSummary: Prisma.BookGetPayload<QueryType>,
): components["schemas"]["BookSummary"] & { deletedAt?: string } => ({
  id: bookSummary.id,
  title: bookSummary.title,
  category: bookSummary.category,
  description: bookSummary.description ?? undefined,
  createdAt: bookSummary.createdAt.toISOString(),
  updatedAt: bookSummary.updatedAt?.toISOString(),
  wordCount: bookSummary.Word.length,
  commentCount: bookSummary.Comment.length,
  collaboratorCount: bookSummary.Collaborator.length,
})
