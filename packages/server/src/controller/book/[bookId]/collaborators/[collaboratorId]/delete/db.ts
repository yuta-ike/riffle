import prisma from "../../../../../../lib/prisma"

const deleteCollaborator = async (collaboratorId: number) => {
  await prisma.collaborator.delete({
    where: {
      id: collaboratorId,
    },
  })
}

export default deleteCollaborator
