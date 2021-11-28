import fastify from "fastify"
import controller from "./controller"
import authPlugin from "./lib/plugin/auth"
import cors from "fastify-cors"
import postLoginController from "./controller/auth/post"

const HOST = process.env.HOST || "localhost"
const PORT = process.env.PORT || "8000"

const startApolloServer = async () => {
  const app = fastify({
    logger: true,
  })
  console.log("CORS: ", JSON.parse(process.env.CORS_URLS ?? "[]"))
  app.register(cors, {
    origin:
      process.env.NODE_ENV === "development"
        ? "https://localhost:3000"
        : (JSON.parse(process.env.CORS_URLS ?? "[]") as string[]),
    // allowedHeaders: "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    // credentials: true,
    // optionsSuccessStatus: 204,
  })

  app.register(postLoginController)

  authPlugin(app, {})

  app.register(controller)

  await app.listen(PORT, HOST)
  console.log(`🚀 Server ready at ${HOST}:${PORT} (${process.env.NODE_ENV})`)
}

startApolloServer()
