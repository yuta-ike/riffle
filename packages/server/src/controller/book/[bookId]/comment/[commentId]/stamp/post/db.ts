import { StampType } from "@prisma/client"
import prisma from "../../../../../../../lib/prisma"
import { prismaStampQuery } from "../../../../../../../mapper/stamp"

const postStamp = async (userId: string, commentId: string, stampType: StampType) => {
  const stamp = await prisma.stamp.create({
    data: {
      stampType,
      userId,
      commentId,
    },
    ...prismaStampQuery(),
  })
  return stamp
}

export default postStamp
