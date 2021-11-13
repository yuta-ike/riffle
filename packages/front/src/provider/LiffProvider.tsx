import React, { useContext, useEffect, useState } from "react"
import { auth } from "../lib/firebase"
import { GoogleAuthProvider, signInWithCustomToken, signInWithPopup } from "@firebase/auth"
import ApiClient, { getApiClient } from "../lib/apiClient"
import type { Liff } from "@line/liff"
import { useRouter } from "next/dist/client/router"

const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID ?? ""

export type AuthUser = {
  userId: string
  name: string
  iconUrl?: string
  token: string
}

const LiffContext = React.createContext<{ liff: Liff; authUser: AuthUser } | null>(null)

type LiffProviderProps = {
  children: React.ReactNode
}

const loginWithLine = async (liff: Liff, apiClient: ApiClient) => {
  await liff.ready

  const liffToken = liff.getIDToken()
  try {
    const {
      data: { token: customToken },
    } = await apiClient.post("/auth", null, { authorization: `Bearer ${liffToken}` })
    const credential = await signInWithCustomToken(auth, customToken)
    const token = await credential.user.getIdToken()
    return token
  } catch (e) {
    console.error(e)
    throw e
  }
}

const LiffProvider: React.VFC<LiffProviderProps> = ({ children }) => {
  const router = useRouter()
  const [value, setValue] = useState<{ liff: Liff; authUser: AuthUser } | null>(null)

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && window.location.search.indexOf("GOOGLE_LOGIN") >= 0) {
      localStorage.setItem("riffle_login_method", "GOOGLE_LOGIN")
    }
    const useGoogleLogin =
      process.env.NODE_ENV === "development" && localStorage.getItem("riffle_login_method") === "GOOGLE_LOGIN"

    ;(async () => {
      const liff = (await import("@line/liff")).default
      await liff.init({
        liffId: LIFF_ID,
        withLoginOnExternalBrowser: !useGoogleLogin,
      })

      const apiClient = getApiClient()

      if (useGoogleLogin) {
        if (auth.currentUser != null) {
          apiClient.token = await auth.currentUser.getIdToken()
        } else {
          const credential = await signInWithPopup(auth, new GoogleAuthProvider())
          apiClient.token = await credential.user.getIdToken()
        }
        setValue({
          liff,
          authUser: {
            userId: auth.currentUser?.uid ?? "",
            name: auth.currentUser?.displayName ?? "",
            iconUrl: auth.currentUser?.photoURL ?? "",
            token: apiClient.token,
          },
        })
      } else {
        const token = await loginWithLine(liff, apiClient)
        apiClient.token = token
        const profile = await liff.getProfile()
        setValue({
          liff,
          authUser: {
            userId: profile.userId,
            name: profile.displayName,
            iconUrl: profile.pictureUrl,
            token,
          },
        })
      }
    })()
  }, [])

  return <LiffContext.Provider value={value}>{children}</LiffContext.Provider>
}

export default LiffProvider

export const useLiff = () => useContext(LiffContext)?.liff
export const useAuthUser = () => useContext(LiffContext)?.authUser
