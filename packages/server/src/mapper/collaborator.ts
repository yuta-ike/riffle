import { Prisma } from "@prisma/client"
import { components } from "../types/generated/schema"

export const prismaCollaboratorQuery = () /*: Omit<Prisma.CollaboratorCreateArgs, "data">*/ =>
  ({
    include: {
      User: true,
    },
  } as const)

type QueryType = ReturnType<typeof prismaCollaboratorQuery>

export const collaboratorMapper = (
  collaborator: Prisma.CollaboratorGetPayload<QueryType>,
): components["schemas"]["Collaborator"] & { deletedAt?: string } => ({
  id: collaborator.id,
  user: collaborator.User,
  role: collaborator.role,
  joinDate: collaborator.joinedAt?.toISOString(),
  requestDate: collaborator.requestedAt?.toISOString(),
})
