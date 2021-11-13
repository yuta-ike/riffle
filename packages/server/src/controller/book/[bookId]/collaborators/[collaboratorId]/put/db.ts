import { Role } from "@prisma/client"
import prisma from "../../../../../../lib/prisma"
import { prismaCollaboratorQuery } from "../../../../../../mapper/collaborator"

const putCollaborator = async (userId: string, collaboratorId: number, role: Role) => {
  const collaborator = await prisma.collaborator.update({
    where: {
      id: collaboratorId,
    },
    data: {
      role,
    },
    ...prismaCollaboratorQuery(),
  })
  return collaborator
}

export default putCollaborator
