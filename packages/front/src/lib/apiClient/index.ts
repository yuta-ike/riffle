import axios, { AxiosResponse } from "axios"
import type { Axios } from "axios"
import { paths } from "../../types/generated/schema"

export type MethodPaths<Methods extends "get" | "post" | "put" | "delete"> = {
  [K in keyof paths]: Methods extends keyof paths[K] ? paths[K] : never
}

export type PathObj<Path extends keyof paths> = "path" extends keyof paths[Path]["parameters"]
  ? {
      url: Path
      params: paths[Path]["parameters"]["path"]
    }
  : Path

export const buildPath = <Path extends keyof paths>(path: PathObj<Path>) => {
  if (typeof path === "string") {
    return path as string
  }
  let url: string = path.url
  Object.entries(path.params).map(([key, value]) => {
    url = url.replace(new RegExp(`{${key}}`, "g"), value)
  })
  return url
}

class ApiClient {
  private constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      // withCredentials: true,
    })
  }

  private static instances: Record<string, ApiClient> = {}

  public static getInstance(baseUrl: string) {
    const storedInstance = this.instances[baseUrl]
    if (storedInstance == null) {
      const instance = new ApiClient(baseUrl)
      this.instances[baseUrl] = instance
      return instance
    } else {
      return storedInstance
    }
  }

  public token: string | null = null
  private readonly axiosInstance: Axios

  private get authorizationHeader() {
    if (this.token == null) {
      if (process.env.NODE_ENV === "development") {
        console.warn("token is not set.")
      }
      return undefined
    }
    return {
      authorization: `Bearer ${this.token}`,
    }
  }

  public get<Path extends keyof MethodPaths<"get">>(
    path: PathObj<Path>,
    customHeader?: Record<string, unknown>,
  ): Promise<
    AxiosResponse<
      paths[Path] extends { get: { responses: { 200: { content: { "application/json": unknown } } } } }
        ? paths[Path]["get"]["responses"][200]["content"]["application/json"]
        : void
    >
  > {
    return this.axiosInstance.get(buildPath(path), {
      headers: { ...this.authorizationHeader, ...customHeader },
    })
  }

  public post<Path extends keyof MethodPaths<"post">>(
    path: PathObj<Path>,
    data: MethodPaths<"post">[Path]["post"] extends { requestBody: { content: { "application/json": unknown } } }
      ? MethodPaths<"post">[Path]["post"]["requestBody"]["content"]["application/json"]
      : null,
    customHeader?: Record<string, unknown>,
  ): Promise<
    AxiosResponse<
      paths[Path] extends { post: { responses: { 200: { content: { "application/json": unknown } } } } }
        ? paths[Path]["post"]["responses"][200]["content"]["application/json"]
        : void
    >
  > {
    console.log(typeof window)
    console.log({
      ...this.authorizationHeader,
      ...customHeader,
    })
    return this.axiosInstance.post(buildPath(path), data, {
      headers: {
        ...this.authorizationHeader,
        ...customHeader,
      },
      // withCredentials: true,
    })
  }

  public put<Path extends keyof MethodPaths<"put">>(
    path: PathObj<Path>,
    data: MethodPaths<"put">[Path]["put"] extends { requestBody: { content: { "application/json": unknown } } }
      ? MethodPaths<"put">[Path]["put"]["requestBody"]["content"]["application/json"]
      : null,
    customHeader?: Record<string, unknown>,
  ): Promise<
    AxiosResponse<
      paths[Path] extends { put: { responses: { 200: { content: { "application/json": unknown } } } } }
        ? paths[Path]["put"]["responses"][200]["content"]["application/json"]
        : void
    >
  > {
    console.log({
      headers: { ...this.authorizationHeader, ...customHeader },
    })
    return this.axiosInstance.put(buildPath(path), data, {
      headers: { ...this.authorizationHeader, ...customHeader },
    })
  }

  public delete<Path extends keyof MethodPaths<"delete">>(
    path: PathObj<Path>,
    customHeader?: Record<string, unknown>,
  ): Promise<
    AxiosResponse<
      paths[Path] extends { delete: { responses: { 200: { content: { "application/json": unknown } } } } }
        ? paths[Path]["delete"]["responses"][200]["content"]["application/json"]
        : void
    >
  > {
    return this.axiosInstance.delete(buildPath(path), {
      headers: { ...this.authorizationHeader, ...customHeader },
    })
  }
}

export default ApiClient

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ""
export const apiClient = () => ApiClient.getInstance(NEXT_PUBLIC_API_BASE_URL)
