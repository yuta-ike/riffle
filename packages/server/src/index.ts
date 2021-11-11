import fastify from "fastify"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const PORT = process.env.PORT || "8000"
const HOST = process.env.HOST || "localhost"

const startApolloServer = async () => {
  const app = fastify()

  app.get("/", async (_, reply) => {
    await prisma.user
      .create({
        data: {
          id: "sample-id",
          name: "name",
          iconUrl: "icon",
        },
      })
      .catch((e) => console.log(e))
    reply.send("hello, world")
  })

  await app.listen(PORT, HOST)
  console.log(`🚀 Server ready at ${HOST}:${PORT}`)
}

startApolloServer()
