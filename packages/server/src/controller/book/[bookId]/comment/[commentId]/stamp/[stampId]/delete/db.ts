import prisma from "../../../../../../../../lib/prisma"

const deleteStamp = async (userId: string, stampId: number) => {
  await prisma.stamp.delete({
    where: {
      id: stampId,
    },
  })
}

export default deleteStamp
