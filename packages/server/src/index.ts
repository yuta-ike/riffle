import fastify from "fastify"
import controller from "./controller"
import authPlugin from "./lib/plugin/auth"

const HOST = process.env.HOST || "localhost"
const PORT = process.env.PORT || "8000"

const startApolloServer = async () => {
  const app = fastify()

  authPlugin(app, {})

  app.register(controller)

  await app.listen(PORT, HOST)
  console.log(`🚀 Server ready at ${HOST}:${PORT}`)
}

startApolloServer()
