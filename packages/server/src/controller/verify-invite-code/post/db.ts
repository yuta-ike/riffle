import prisma from "../../../lib/prisma"
import { prismaBookSummaryQuery } from "../../../mapper/bookSummary"

const getBookWithInviteCode = async (inviteCode: string) => {
  const book = await prisma.inviteCode.findUnique({
    where: {
      inviteCode,
    },
    include: {
      InviterUser: true,
      Book: prismaBookSummaryQuery(),
    },
  })
  return book
}

export default getBookWithInviteCode
