---
name: 'mapper'
root: './packages/server/src/mapper'
output: '**/*'
ignore: []
questions:
  name: 'モデル名'
---

# `{{ inputs.name }}.ts`

```
import { Prisma } from "@prisma/client"
import { components } from "../types/generated/schema"

export const prisma{{ inputs.name | pascal }}Query = () /*: Omit<Prisma.{{ inputs.name | pascal }}CreateArgs, "data">*/ =>
  ({
    include: {
      
    },
  } as const)

type QueryType = ReturnType<typeof prisma{{ inputs.name | pascal }}Query>

export const {{ inputs.name }}Mapper = ({{ inputs.name }}: Prisma.{{ inputs.name | pascal }}GetPayload<QueryType>): components["schemas"]["{{ inputs.name | pascal }}"] => ({
  ...{{ inputs.name }},
  createdAt: {{ inputs.name }}.createdAt.toISOString(),
  updatedAt: {{ inputs.name }}.updatedAt?.toISOString(),
})
```