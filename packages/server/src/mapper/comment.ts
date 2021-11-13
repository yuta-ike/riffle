import { Prisma } from "@prisma/client"
import { components } from "../types/generated/schema"

export const prismaCommentQuery = () /*: Omit<Prisma.CommentCreateArgs, "data">*/ =>
  ({
    include: {
      User: true,
      Stamp: {
        include: {
          User: true,
        },
      },
    },
  } as const)

type QueryType = ReturnType<typeof prismaCommentQuery>

export const commentMapper = (
  comment: Prisma.CommentGetPayload<QueryType>,
): components["schemas"]["Comment"] & { deletedAt?: string } => ({
  id: comment.id,
  content: comment.content,
  commentType: comment.commentType,
  author: comment.User,
  createdAt: comment.createdAt.toISOString(),
  deletedAt: comment.deletedAt?.toISOString(),
  stamps: comment.Stamp.map((stamp) => ({
    ...stamp,
    author: stamp.User,
    createdAt: stamp.createdAt.toISOString(),
  })),
})
