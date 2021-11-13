import { Category } from "@prisma/client"
import prisma from "../../../../lib/prisma"
import { prismaOwnedBookDetailQuery } from "../../../../mapper/ownedBookDetail"

export type PathBookDetailParams = {
  title?: string
  category?: Category
  description?: string
}

export const patchOwnedBookDetail = (
  userId: string,
  bookId: number,
  { title, category, description }: PathBookDetailParams,
) => {
  // TODO: owner権限チェック
  return prisma.ownedBook.update({
    where: {
      id: bookId,
    },
    data: {
      Book: {
        update: {
          title,
          category,
          description,
        },
      },
    },
    ...prismaOwnedBookDetailQuery(userId),
  })
}

export const patchOwnedBookDetailFavorite = (userId: string, bookId: number, isFavorite: boolean) => {
  return prisma.ownedBook.update({
    where: {
      id: bookId,
    },
    data: {
      isFavorite,
    },
    ...prismaOwnedBookDetailQuery(userId),
  })
}
