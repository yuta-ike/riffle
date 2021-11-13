import React from "react"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import LiffProvider from "../provider/LiffProvider"
import { SWRConfig } from "swr"
// import AuthProvider from "../provider/AuthProvider"
// import ApiClientProvider from "../provider/ApiClientProvider"

const MyApp: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <LiffProvider>
        {/* <AuthProvider> */}
        <Component {...pageProps} />
        {/* </AuthProvider> */}
      </LiffProvider>
    </SWRConfig>
  )
}

export default MyApp
