import prisma from "../../../lib/prisma"

type PostLoginParams = {
  iconUrl?: string
  name?: string
}

const putAuth = async (userId: string, { iconUrl, name }: PostLoginParams) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      iconUrl,
      name,
    },
  })
  return user
}

export default putAuth
