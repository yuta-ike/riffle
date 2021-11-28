import prisma from "../../../../../lib/prisma"

type PostScoreParams = {
  wordId: number
  result: boolean
}[]

const postScore = async (userId: string, scores: PostScoreParams) => {
  await prisma.wordScore.createMany({
    data: scores.map(({ wordId, result }) => ({
      userId,
      wordId,
      result,
    })),
  })
}

export default postScore
