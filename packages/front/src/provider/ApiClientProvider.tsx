import React, { useEffect, useContext } from "react"
import { apiClient } from "../lib/apiClient"
import { useAuthUser } from "./AuthProvider"
import type ApiClient from "../lib/apiClient"

// TODO: Context APIを利用する必要がないのでリファクタ対象
const apiClient = apiClient()

const ApiClientContext = React.createContext<ApiClient>(apiClient)

type ApiClientProviderProps = {
  children: React.ReactNode
}

/**
 * @deprecated
 */
const ApiClientProvider: React.VFC<ApiClientProviderProps> = ({ children }) => {
  const authUser = useAuthUser()
  useEffect(() => {
    if (authUser == null) {
      apiClient.token = null
    } else {
      apiClient.token = authUser.token
    }
  }, [authUser])

  return <ApiClientContext.Provider value={apiClient}>{children}</ApiClientContext.Provider>
}

export default ApiClientProvider

export const useApiClient = () => useContext(ApiClientContext)
