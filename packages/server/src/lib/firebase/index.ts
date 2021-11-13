import { initializeApp, cert } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // NOTE:  replace `\` and `n` character pairs w/ single `\n` character
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
})

export const auth = getAuth(app)

export default app
