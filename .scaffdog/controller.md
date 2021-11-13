---
name: 'controller'
root: './packages/server/src/controller'
output: '**/*'
ignore: []
questions:
  methodName: 'メソッド名'
  apiPath: 'APIのパス'
  controllerName: 'コントローラ名'
---

# `{{ inputs.methodName }}/index.ts`

```ts
import { FastifyPluginAsync } from "fastify"
import {{ inputs.methodName }}{{ inputs.controllerName | pascal }} from "./db"

const {{ inputs.methodName }}{{ inputs.controllerName | pascal }}Controller: FastifyPluginAsync = async (server) => {
  server.{{ inputs.methodName }}<"{{ inputs.methodName }}", "{{ inputs.apiPath }}">("{{ inputs.apiPath }}", async (req) => {
    const res = await {{ inputs.methodName }}{{ inputs.controllerName | pascal }}()

    return {
      
    }
  })
}

export default {{ inputs.methodName }}{{ inputs.controllerName | pascal }}Controller
```

# `{{ inputs.methodName }}/db.ts`
```ts
import prisma from "{{ relative "../packages/server/src/lib/prisma" }}"

const {{ inputs.methodName }}{{ inputs.controllerName | pascal }} = async (userId: string) => {
  
}

export default {{ inputs.methodName }}{{ inputs.controllerName | pascal }}
```