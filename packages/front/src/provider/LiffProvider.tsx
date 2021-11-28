import React, { useContext, useEffect, useState } from "react"
import { auth } from "../lib/firebase"
import { GoogleAuthProvider, signInWithCustomToken, signInWithPopup } from "@firebase/auth"
import ApiClient, { apiClient as getApiClient } from "../lib/apiClient"
import type { Liff } from "@line/liff"
import nookies from "nookies"

// TODO: AuthとLiffが一緒くたになってるのでリファクタ対象

const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID ?? ""

export type AuthUser = {
  id: string
  name: string
  iconUrl: string
  token: () => Promise<string>
  cachedToken: string
}

export type LiffContextType = { liff: Liff | null; authUser: AuthUser | null }
const liffContextInit = { liff: null, authUser: null }
const LiffContext = React.createContext<LiffContextType>(liffContextInit)

type LiffProviderProps = {
  children: React.ReactNode
}

const loginWithLine = async (liff: Liff, apiClient: ApiClient) => {
  await liff.ready

  const liffToken = liff.getIDToken()
  console.log("liffToken: ", liffToken)
  try {
    console.log("X: ", liffToken)
    const {
      data: { token: customToken },
      // @ts-ignore
    } = await apiClient.post("/auth", null, {
      authorization: `Bearer ${liffToken}`,
    })
    console.log("A: ", customToken)
    const credential = await signInWithCustomToken(auth, customToken)
    console.log("B: ", credential)
    const token = await credential.user.getIdToken()
    console.log("C: ", token)
    return token
  } catch (e) {
    console.error("error!!!!: ", e)
    throw e
  }
}

const LiffProvider: React.VFC<LiffProviderProps> = ({ children }) => {
  const [value, setValue] = useState<LiffContextType>(liffContextInit)

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
        setValue((prev) => ({
          ...prev,
          liff,
          // authUser: {
          //   id: auth.currentUser?.uid ?? "",
          //   name: auth.currentUser?.displayName ?? "",
          //   iconUrl: auth.currentUser?.photoURL ?? "",
          //   token: apiClient.token,
          // },
        }))
      } else {
        console.log("#loginWithLine")
        const token = await loginWithLine(liff, apiClient)
        // const profile = await liff.getProfile()
        setValue((prev) => ({
          ...prev,
          liff,
          // authUser: {
          //   id: profile.userId,
          //   name: profile.displayName,
          //   iconUrl: profile.pictureUrl ?? "",
          //   token,
          // },
        }))
      }
    })()
  }, [])

  useEffect(() => {
    auth.onIdTokenChanged(async (user) => {
      console.log("AAA")
      if (user != null) {
        console.log("BBB")
        const token = await user.getIdToken()
        console.log("CCC")
        setValue((prev) => ({
          ...prev,
          authUser: {
            id: user.uid,
            name: user.displayName ?? "",
            iconUrl: user.photoURL ?? "",
            token: () => user.getIdToken(),
            cachedToken: token,
          },
        }))
        nookies.set(null, "token", token, {})
      } else {
        console.log("DDD")
        setValue((prev) => ({
          ...prev,
          authUser: null,
        }))
        value.liff?.logout()
        nookies.set(null, "token", "", {})
      }
    })
  }, [value.liff])

  return <LiffContext.Provider value={value}>{children}</LiffContext.Provider>
}

export default LiffProvider

export const useLiff = () => useContext(LiffContext)?.liff
export const useAuthUser = () => useContext(LiffContext)?.authUser
