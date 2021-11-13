import prisma from "../../../../../../../../../../lib/prisma"

const deleteWordStamp = async (userId: string, stampId: number) => {
  await prisma.stamp.delete({
    where: {
      id: stampId,
    },
  })
}

export default deleteWordStamp
