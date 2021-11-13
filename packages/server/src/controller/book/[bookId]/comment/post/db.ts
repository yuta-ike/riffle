import { CommentType } from "@prisma/client"
import prisma from "../../../../../lib/prisma"
import { prismaCommentQuery } from "../../../../../mapper/comment"

type PostCommentParams = {
  content: string
  type: CommentType
}

const postComment = async (userId: string, bookId: string, params: PostCommentParams) => {
  const comment = await prisma.comment.create({
    data: {
      commentType: params.type,
      content: params.content,
      bookId,
      userId,
    },
    ...prismaCommentQuery(),
  })
  return comment
}

export default postComment
