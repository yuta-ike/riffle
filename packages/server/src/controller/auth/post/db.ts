import prisma from "../../../lib/prisma"

type PostLoginParams = {
  iconUrl: string
  name: string
}

const postLogin = async (userId: string, { iconUrl, name }: PostLoginParams) => {
  const user = await prisma.user.create({
    data: {
      id: userId,
      iconUrl,
      name,
    },
  })
  return user
}

export default postLogin
