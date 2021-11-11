import fastify from "fastify"

const PORT = process.env.PORT || "8000"
const HOST = process.env.HOST || "localhost"

const startApolloServer = async () => {
  const app = fastify()

  app.get("/", (_, reply) => {
    console.log("hello")
    reply.send("hello, world")
    return
  })

  await app.listen(PORT, HOST)
  console.log(`🚀 Server ready at ${HOST}:${PORT}`)
}

startApolloServer()
