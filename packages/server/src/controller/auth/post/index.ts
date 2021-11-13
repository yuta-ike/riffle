import { FastifyPluginAsync } from "fastify"
import { auth } from "../../../lib/firebase"
import postLogin from "./db"

const postLoginController: FastifyPluginAsync = async (server) => {
  server.post<"post", "/auth">("/auth", async (req) => {
    const token = await auth.createCustomToken("uid")
    const user = await postLogin("dummy-user-id", { iconUrl: "", name: "" })
    return {
      user,
      token,
    }
  })
}

export default postLoginController
