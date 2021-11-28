import { useCallback, useState } from "react"
import useSWR from "swr"
import { apiClient, buildPath, MethodPaths, PathObj } from "."
import { useAuthUser } from "../../provider/LiffProvider"
import { paths } from "../../types/generated/schema"

import type { SWRConfiguration } from "swr"

export const useRequest = () => {
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const authUser = useAuthUser()
  const post = useCallback(
    async <Path extends keyof MethodPaths<"post">>(
      path: PathObj<Path>,
      data: MethodPaths<"post">[Path]["post"] extends { requestBody: { content: { "application/json": unknown } } }
        ? MethodPaths<"post">[Path]["post"]["requestBody"]["content"]["application/json"]
        : null,
      customHeader?: Record<string, unknown>,
      {
        showToast = true,
      }: {
        showToast?: boolean
      } = {},
    ): Promise<
      paths[Path] extends { post: { responses: { 200: { content: { "application/json": unknown } } } } }
        ? paths[Path]["post"]["responses"][200]["content"]["application/json"]
        : void
    > => {
      if (isValidating) {
        throw new Error("another request is ongoing")
      }
      try {
        setError(null)
        setIsValidating(true)
        const token = await authUser?.token()
        const res = await apiClient().post(path, data, {
          ...customHeader,
          authorization: token == null ? undefined : `Bearer ${token}`,
        })
        setError(null)
        return res.data
      } catch (e) {
        if (showToast) {
          // TODO: デザイン
          window.alert("エラーが発生しました")
        }
        setError(e)
        throw e
      } finally {
        setIsValidating(false)
      }
    },
    [authUser, isValidating],
  )
  const put = useCallback(
    async <Path extends keyof MethodPaths<"put">>(
      path: PathObj<Path>,
      data: MethodPaths<"put">[Path]["put"] extends { requestBody: { content: { "application/json": unknown } } }
        ? MethodPaths<"put">[Path]["put"]["requestBody"]["content"]["application/json"]
        : null,
      customHeader?: Record<string, unknown>,
      {
        showToast = true,
      }: {
        showToast?: boolean
      } = {},
    ): Promise<
      paths[Path] extends { put: { responses: { 200: { content: { "application/json": unknown } } } } }
        ? paths[Path]["put"]["responses"][200]["content"]["application/json"]
        : void
    > => {
      if (isValidating) {
        throw new Error("another request is ongoing")
      }
      try {
        setError(null)
        setIsValidating(true)
        const token = await authUser?.token?.()
        const res = await apiClient().put(path, data, {
          ...customHeader,
          authorization: token == null ? undefined : `Bearer ${token}`,
        })
        setError(null)
        return res.data
      } catch (e) {
        if (showToast) {
          // TODO: デザイン
          window.alert("エラーが発生しました")
        }
        setError(e)
        throw e
      } finally {
        setIsValidating(false)
      }
    },
    [authUser, isValidating],
  )
  const deleteRequest = useCallback(
    async <Path extends keyof MethodPaths<"delete">>(
      path: PathObj<Path>,
      customHeader?: Record<string, unknown>,
      {
        showToast = true,
      }: {
        showToast?: boolean
      } = {},
    ): Promise<
      paths[Path] extends { delete: { responses: { 200: { content: { "application/json": unknown } } } } }
        ? paths[Path]["delete"]["responses"][200]["content"]["application/json"]
        : void
    > => {
      if (isValidating) {
        throw new Error("another request is ongoing")
      }
      try {
        setError(null)
        setIsValidating(true)
        const token = await authUser?.token?.()
        const res = await apiClient().delete(path, {
          ...customHeader,
          authorization: token == null ? undefined : `Bearer ${token}`,
        })
        setError(null)
        return res.data
      } catch (e) {
        if (showToast) {
          // TODO: デザイン
          window.alert("エラーが発生しました")
        }
        setError(e)
        throw e
      } finally {
        setIsValidating(false)
      }
    },
    [authUser, isValidating],
  )

  return { post, put, deleteRequest, isValidating, error }
}

export const useApiSWR = <Path extends keyof MethodPaths<"get">>(
  path: PathObj<Path> | null,
  fallbackData?: paths[Path] extends { get: { responses: { 200: { content: { "application/json": unknown } } } } }
    ? paths[Path]["get"]["responses"][200]["content"]["application/json"]
    : void,
  options?: SWRConfiguration,
) => {
  const authUser = useAuthUser()
  return useSWR<
    paths[Path] extends { get: { responses: { 200: { content: { "application/json": unknown } } } } }
      ? paths[Path]["get"]["responses"][200]["content"]["application/json"]
      : void
  >(
    path != null ? buildPath(path) : null,
    async () => {
      const token = await authUser?.token()
      const res = await apiClient().get(path as PathObj<Path>, { Authorization: `Bearer ${token}` })
      return res.data
    },
    {
      ...options,
      fallbackData,
    },
  )
}
