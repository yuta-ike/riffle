import removeTrailingComma from "../lib/removeTrailingComma"

const liffUrl = removeTrailingComma(process.env.NEXT_PUBLIC_LIFF_URL ?? "")

const generateInviteUrl = (inviteCode: string) => `${liffUrl}/invited?code=${inviteCode}`

export default generateInviteUrl
