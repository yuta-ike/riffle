import { Prisma } from "@prisma/client"
import { components } from "../types/generated/schema"

export const prismaStampQuery = () /*: Omit<Prisma.StampCreateArgs, "data">*/ =>
  ({
    include: {
      User: true,
    },
  } as const)

type QueryType = ReturnType<typeof prismaStampQuery>

export const stampMapper = (stamp: Prisma.StampGetPayload<QueryType>): components["schemas"]["Stamp"] => ({
  ...stamp,
  author: stamp.User,
  createdAt: stamp.createdAt.toISOString(),
})
