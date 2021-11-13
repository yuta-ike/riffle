import { CommentType } from "@prisma/client"
import prisma from "../../../../../../../lib/prisma"
import { prismaCommentQuery } from "../../../../../../../mapper/comment"

type PostWordCommentParams = {
  content: string
  type: CommentType
}

const postWordComment = async (userId: string, wordId: number, params: PostWordCommentParams) => {
  const comment = await prisma.comment.create({
    data: {
      commentType: params.type,
      content: params.content,
      wordId,
      userId,
    },
    ...prismaCommentQuery(),
  })
  return comment
}

export default postWordComment
