// import React, { useEffect, useContext, useState } from "react"
// import { useLiff } from "./LiffProvider"

// export type AuthUser = {
//   userId: string
//   name: string
//   iconUrl?: string
//   token: string
// }

// const AuthContext = React.createContext<AuthUser | null>(null)

// type AuthProviderProps = {
//   children: React.ReactNode
// }

// const AuthProvider: React.VFC<AuthProviderProps> = ({ children }) => {
//   const [authUser, setAuthUser] = useState<AuthUser | null>(null)
//   const liff = useLiff()
//   useEffect(() => {
//     if (liff == null) {
//       return
//     }
//     ;(async () => {
//       const profile = await liff.getProfile()
//       // NOTE: profile scopeを追加している場合は必ずidTokenが得られるはず
//       const idToken = liff.getIDToken() as string
//       setAuthUser({
//         userId: profile.userId,
//         name: profile.displayName,
//         iconUrl: profile.pictureUrl,
//         token: idToken,
//       })
//     })()
//   }, [liff])

//   return <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
// }

// export default AuthProvider

// export const useAuthUser = () => useContext(AuthContext)

export default null
