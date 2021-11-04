import { ApolloServer, FastifyContext } from "apollo-server-fastify"
import {
  ApolloServerPluginDrainHttpServer,
  Config,
  gql,
} from "apollo-server-core"
import fastify, { FastifyInstance } from "fastify"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { loadSchemaSync } from "@graphql-tools/load"
import { addResolversToSchema } from "@graphql-tools/schema"
import { join } from "path"
import { Resolvers } from "./types/generated/graphql"

const schema = loadSchemaSync(join(__dirname, "../../graphql/schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
})

const PORT = process.env.PORT || "8000"

const fastifyAppClosePlugin = (app: FastifyInstance) => {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close()
        },
      }
    },
  }
}

const resolvers: Resolvers = {
  Query: {
    // getOwnedBooks: () => [
    //   {
    //     id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    //     title: "教科書第2章 新出単語",
    //     category: "english",
    //     description: "教科書第2章の本文中に出てくる新出単語をまとめました",
    //     words: [
    //       {
    //         id: 1,
    //         order: 1,
    //         question: "traditional",
    //         answer: "伝統的な",
    //         comments: [
    //           {
    //             id: 1,
    //             content: "サンプルコメント",
    //             type: "word",
    //             author: {
    //               id: "user-id",
    //               name: "john-doe",
    //               iconUrl: "http://example.com/icon.png",
    //             },
    //             createDate: "2021-08-24T14:15:22Z",
    //             stamps: [
    //               {
    //                 id: 1,
    //                 stampTypeId: 1,
    //                 author: {
    //                   id: "user-id",
    //                   name: "john-doe",
    //                   iconUrl: "http://example.com/icon.png",
    //                 },
    //                 createDate: "2021-08-25T14:15:22Z",
    //               },
    //               {
    //                 id: 2,
    //                 stampTypeId: 3,
    //                 author: {
    //                   id: "user-id-2",
    //                   name: "田中太郎",
    //                   iconUrl: "http://example.com/icon.png",
    //                 },
    //                 createDate: "2021-08-25T18:15:22Z",
    //               },
    //             ],
    //           },
    //         ],
    //         createDate: "2021-08-20T14:15:22Z",
    //         updateDate: "2021-08-20T14:30:22Z",
    //         author: {
    //           id: "user-id",
    //           name: "john-doe",
    //           iconUrl: "http://example.com/icon.png",
    //         },
    //         wordScores: [],
    //         wordDetail: {
    //           done: true,
    //           flags: [0, 1],
    //         },
    //       },
    //     ],
    //     comments: [
    //       {
    //         id: 1,
    //         content: "サンプルコメント",
    //         type: "text",
    //         author: {
    //           id: "user-id",
    //           name: "john-doe",
    //           iconUrl: "http://example.com/icon.png",
    //         },
    //         createDate: "2021-08-24T14:15:22Z",
    //         stamps: [
    //           {
    //             id: 1,
    //             stampTypeId: 1,
    //             author: {
    //               id: "user-id",
    //               name: "john-doe",
    //               iconUrl: "http://example.com/icon.png",
    //             },
    //             createDate: "2021-08-25T14:15:22Z",
    //           },
    //           {
    //             id: 2,
    //             stampTypeId: 3,
    //             author: {
    //               id: "user-id-2",
    //               name: "田中太郎",
    //               iconUrl: "http://example.com/icon.png",
    //             },
    //             createDate: "2021-08-25T18:15:22Z",
    //           },
    //         ],
    //       },
    //     ],
    //     author: {
    //       id: "user-id",
    //       name: "john-doe",
    //       iconUrl: "http://example.com/icon.png",
    //     },
    //     createDate: "2021-08-20T14:15:22Z",
    //     updateDate: "2021-08-20T14:20:22Z",
    //     collaborators: [
    //       {
    //         id: 2,
    //         user: {
    //           id: "user-id-2",
    //           name: "田中太郎",
    //           iconUrl: "http://example.com/icon.png",
    //         },
    //         joinDate: "2021-08-27T14:15:22Z",
    //         requestDate: "2021-08-25T14:15:22Z",
    //         role: "editor",
    //       },
    //     ],
    //   },
    // ],
  },
  Mutation: {
    postBook(_, { input }) {},
  },
}

const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

const startApolloServer = async () => {
  const app = fastify()
  const apolloServer = new ApolloServer({
    schema: schemaWithResolvers,
    plugins: [
      fastifyAppClosePlugin(app),
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
    ],
  })

  await apolloServer.start()
  app.register(apolloServer.createHandler({ path: "/graphql" }))
  await app.listen(PORT)
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`,
  )
}

startApolloServer()
