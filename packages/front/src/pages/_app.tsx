import React from "react"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import LiffProvider, { AuthUser, useAuthUser } from "../provider/LiffProvider"
import { SWRConfig } from "swr"
import ModalProvider from "../provider/ModalProvider"
import Loading from "../view/template/Loading"

const MyApp: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <ModalProvider>
        <LiffProvider>
          <AuthPage fallback={<Loading />}>{(authUser) => <Component {...pageProps} authUser={authUser} />}</AuthPage>
        </LiffProvider>
      </ModalProvider>
    </SWRConfig>
  )
}

export default MyApp

const AuthPage: React.VFC<{ children: (authUser: AuthUser) => React.ReactNode; fallback: React.ReactNode }> = ({
  children,
  fallback,
}) => {
  const authUser = useAuthUser()
  if (authUser == null) {
    return <>{fallback}</>
  }
  return <>{children(authUser)}</>
}
