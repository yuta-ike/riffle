import { initializeApp, cert } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
})

export default app

const authAuth = getAuth(app)

export { authAuth }
