import { Role } from "@prisma/client"
import prisma from "../../../../../../lib/prisma"

export const deauthorizedCheck = async (inviteCode: string) => {
  const res = await prisma.inviteCode.findUnique({
    where: {
      inviteCode,
    },
  })
  if (res == null) {
    return false
  }

  if (res.deauthorizedAt != null) {
    return "ALREADY_USED"
  }

  if (new Date().getTime() <= res.expireDate.getTime()) {
    return "EXPIRED"
  }
  return true
}

export const acceptInviteAndCreateCollaborator = async (userId: string, bookId: string, inviteCode: string) => {
  await prisma.$transaction(async (prisma) => {
    const result = await prisma.inviteCode.update({
      where: {
        inviteCode,
      },
      data: {
        deauthorizedAt: new Date(),
        inviteeUserId: userId,
        accepted: true,
      },
      select: {
        role: true,
      },
    })

    await prisma.collaborator.create({
      data: {
        bookId,
        role: result.role,
        joinedAt: new Date(),
        userId,
      },
    })
    return
  })
}

export const denyInvite = async (userId: string, inviteCode: string) => {
  await prisma.inviteCode.update({
    where: {
      inviteCode,
    },
    data: {
      deauthorizedAt: new Date(),
      inviteeUserId: userId,
      accepted: false,
    },
  })
}
