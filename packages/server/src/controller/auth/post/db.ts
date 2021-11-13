import prisma from "../../../lib/prisma"

type PostLoginParams = {
  iconUrl: string
  name: string
}

const postLogin = async (userId: string, { iconUrl, name }: PostLoginParams) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  // ユーザーが存在していない
  if (user == null) {
    const user = await prisma.user.create({
      data: {
        id: userId,
        iconUrl,
        name,
      },
    })
    return user
  }
  // プロフィールが変更されていない and LINEのプロフィールが更新された
  if (!user.isManualUpdated && (user.name !== name || user.iconUrl !== iconUrl)) {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        iconUrl,
      },
    })
    return user
  }
  return user
}

export default postLogin
