import prisma from "../../../../../../../../lib/prisma"

const deleteComment = async (commentId: string) => {
  await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      deletedAt: new Date(),
    },
  })
  return
}

export default deleteComment
