import fastify from "fastify"
import controller from "./controller"
import notFoundDecoratorPlugin from "./lib/decorator/notFound"

const HOST = process.env.HOST || "localhost"
const PORT = process.env.PORT || "8000"

const startApolloServer = async () => {
  const app = fastify()

  app.register(notFoundDecoratorPlugin)
  app.register(controller)

  await app.listen(PORT, HOST)
  console.log(`🚀 Server ready at ${HOST}:${PORT}`)
}

startApolloServer()
