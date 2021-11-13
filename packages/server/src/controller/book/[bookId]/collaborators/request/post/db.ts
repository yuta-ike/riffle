import prisma from "../../../../../../lib/prisma"
import { prismaCollaboratorRequestQuery } from "../../../../../../mapper/collaboratorRequest"

const postCollaboratorRequest = async (userId: string, bookId: string) => {
  const request = await prisma.collaboratorRequest.create({
    data: {
      userId,
      bookId,
    },
    ...prismaCollaboratorRequestQuery(),
  })
  return request
}

export default postCollaboratorRequest
