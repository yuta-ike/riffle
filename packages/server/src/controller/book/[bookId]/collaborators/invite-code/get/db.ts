import prisma from "../../../../../../lib/prisma"

const getInviteCode = async (userId: string, bookId: string) => {
  const inviteCodes = await prisma.inviteCode.findMany({
    where: {
      bookId,
      OR: [
        {
          deauthorizedAt: {
            equals: null,
          },
        },
        {
          expireDate: {
            lte: new Date(),
          },
        },
      ],
    },
  })
  return inviteCodes
}

export default getInviteCode
