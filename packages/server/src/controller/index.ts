import { Resolvers } from "../types/generated/graphql"

const resolvers: Pick<Resolvers, "Query" | "Mutation"> = {
  Query: {
    getConnectCode: () => {
      throw new Error("not implemented")
    },
    getFriends: () => {
      throw new Error("not implemented")
    },
    getInviteCode: () => {
      throw new Error("not implemented")
    },
    getOwnedBook: () => {
      throw new Error("not implemented")
    },
    getOwnedBooks: () => {
      throw new Error("not implemented")
    },
  },
  Mutation: {
    deleteBook: () => {
      throw new Error("not implemented")
    },
    deleteBookComment: () => {
      throw new Error("not implemented")
    },
    deleteCollaborator: () => {
      throw new Error("not implemented")
    },
    deleteFriend: () => {
      throw new Error("not implemented")
    },
    deleteWord: () => {
      throw new Error("not implemented")
    },
    deleteWordComment: () => {
      throw new Error("not implemented")
    },
    deleteWordCommentStamp: () => {
      throw new Error("not implemented")
    },
    postApprove: () => {
      throw new Error("not implemented")
    },
    postBook: () => {
      throw new Error("not implemented")
    },
    postBookComment: () => {
      throw new Error("not implemented")
    },
    postConnect: () => {
      throw new Error("not implemented")
    },
    postFork: () => {
      throw new Error("not implemented")
    },
    postInvited: () => {
      throw new Error("not implemented")
    },
    postRequest: () => {
      throw new Error("not implemented")
    },
    postWord: () => {
      throw new Error("not implemented")
    },
    postWordComment: () => {
      throw new Error("not implemented")
    },
    postWordCommentStamp: () => {
      throw new Error("not implemented")
    },
    postWordScore: () => {
      throw new Error("not implemented")
    },
    putBook: () => {
      throw new Error("not implemented")
    },
    putPreference: () => {
      throw new Error("not implemented")
    },
    putWord: () => {
      throw new Error("not implemented")
    },
    putWordStatus: () => {
      throw new Error("not implemented")
    },
  },
}

export default resolvers
