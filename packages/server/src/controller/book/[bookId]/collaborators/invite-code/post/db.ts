import { Role } from "@prisma/client"
import prisma from "../../../../../../lib/prisma"

const getExpireDate = () => {
  const expireDate = new Date()
  expireDate.setDate(expireDate.getDate() + 7)
  return expireDate
}

const getInviteCode = async (userId: string, bookId: string, role: Role) => {
  const res = await prisma.inviteCode.create({
    data: {
      inviterUserId: userId,
      bookId,
      role,
      expireDate: getExpireDate(),
    },
    select: {
      inviteCode: true,
    },
  })
  return res.inviteCode
}

export default getInviteCode
