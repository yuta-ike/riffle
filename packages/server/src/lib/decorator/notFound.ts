import { FastifyPluginAsync } from "fastify"

const notFoundDecoratorPlugin: FastifyPluginAsync = async (server) => {
  server.decorateReply("notFound", function () {
    this.code(404).type("application/json").send({ message: "Not Found" })
  })
}

export default notFoundDecoratorPlugin

declare module "fastify" {
  interface FastifyReply {
    notFound: () => void
  }
}
