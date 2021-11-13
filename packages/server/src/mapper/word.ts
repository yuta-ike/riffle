import { Prisma } from "@prisma/client"
import { components } from "../types/generated/schema"
import { commentMapper, prismaCommentQuery } from "./comment"

export const prismaWordQuery = () /*: Omit<Prisma.WordCreateArgs, "data">*/ =>
  ({
    include: {
      WordDetail: true,
      WordScore: true,
      Comment: prismaCommentQuery(),
      User: true,
    },
  } as const)

type QueryType = ReturnType<typeof prismaWordQuery>

export const wordMapper = (
  word: Prisma.WordGetPayload<QueryType>,
): components["schemas"]["Word"] & { deletedAt?: string } => ({
  ...word,
  done: word.WordDetail?.[0]?.done ?? false,
  flags: word.WordDetail?.[0]?.flags ?? [],
  author: word.User,
  createdAt: word.createdAt.toISOString(),
  updatedAt: word.updatedAt?.toISOString(),
  deletedAt: word.deletedAt?.toISOString(),
  comments: word.Comment.map((comment) => commentMapper(comment)),
})
