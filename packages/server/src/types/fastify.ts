import type { paths } from "./schema"
import type {
  ContextConfigDefault,
  RawServerDefault,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RouteHandlerMethod,
} from "fastify"

export type GetRoute<
  Path extends {
    [K in keyof paths]: paths[K] extends { get: unknown } ? K : never
  }[keyof paths],
> = {
  Params: paths[Path] extends { parameters: { path: unknown } } ? paths[Path]["parameters"]["path"] : undefined
  Reply: paths[Path] extends {
    get: { responses: { "200": { content: { "application/json": unknown } } } }
  }
    ? paths[Path]["get"]["responses"]["200"]["content"]["application/json"]
    : undefined
}

export type PostRoute<
  Path extends {
    [K in keyof paths]: paths[K] extends { post: unknown } ? K : never
  }[keyof paths],
> = {
  Params: paths[Path] extends { parameters: { path: unknown } } ? paths[Path]["parameters"]["path"] : undefined
  Body: paths[Path] extends {
    post: { requestBody: { content: { "application/json": unknown } } }
  }
    ? paths[Path]["post"]["requestBody"]["content"]["application/json"]
    : undefined
  Reply: paths[Path] extends {
    post: { responses: { "200": { content: { "application/json": unknown } } } }
  }
    ? paths[Path]["post"]["responses"]["200"]["content"]["application/json"]
    : undefined
}

export type PutRoute<
  Path extends {
    [K in keyof paths]: paths[K] extends { put: unknown } ? K : never
  }[keyof paths],
> = {
  Params: paths[Path] extends { parameters: { path: unknown } } ? paths[Path]["parameters"]["path"] : undefined
  Body: paths[Path] extends {
    put: { requestBody: { content: { "application/json": unknown } } }
  }
    ? paths[Path]["put"]["requestBody"]["content"]["application/json"]
    : undefined
  Reply: paths[Path] extends {
    put: { responses: { "200": { content: { "application/json": unknown } } } }
  }
    ? paths[Path]["put"]["responses"]["200"]["content"]["application/json"]
    : undefined
}

export type DeleteRoute<
  Path extends {
    [K in keyof paths]: paths[K] extends { delete: unknown } ? K : never
  }[keyof paths],
> = {
  Params: paths[Path] extends { parameters: { path: unknown } } ? paths[Path]["parameters"]["path"] : undefined
  Reply: paths[Path] extends {
    delete: {
      responses: { "200": { content: { "application/json": unknown } } }
    }
  }
    ? paths[Path]["delete"]["responses"]["200"]["content"]["application/json"]
    : undefined
}

declare module "fastify" {
  interface FastifyInstance<
    RawServer extends RawServerBase = RawServerDefault,
    RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
    RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  > {
    get: RouteShorthandMethod<RawServer, RawRequest, RawReply>
    post: RouteShorthandMethod<RawServer, RawRequest, RawReply>
  }

  interface RouteShorthandMethod<
    RawServer extends RawServerBase = RawServerDefault,
    RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
    RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
  > {
    <
      Method extends "get" | "post" | "put" | "patch" | "delete",
      Path extends {
        [K in keyof paths]-?: Method extends keyof paths[K] ? K : never
      }[keyof paths] &
        keyof paths,
      ContextConfig = ContextConfigDefault,
    >(
      path: Path,
      handler: RouteHandlerMethod<
        RawServer,
        RawRequest,
        RawReply,
        {
          Params: paths[Path] extends { parameters: { path: unknown } } ? paths[Path]["parameters"]["path"] : undefined
          Body: Method extends keyof paths[Path]
            ? "requestBody" extends keyof paths[Path][Method]
              ? "content" extends keyof paths[Path][Method]["requestBody"]
                ? "application/json" extends keyof paths[Path][Method]["requestBody"]["content"]
                  ? paths[Path][Method]["requestBody"]["content"]["application/json"]
                  : undefined
                : undefined
              : undefined
            : undefined
          Reply: Method extends keyof paths[Path]
            ? "responses" extends keyof paths[Path][Method]
              ? 200 extends keyof paths[Path][Method]["responses"]
                ? "content" extends keyof paths[Path][Method]["responses"][200]
                  ? "application/json" extends keyof paths[Path][Method]["responses"][200]["content"]
                    ? paths[Path][Method]["responses"][200]["content"]["application/json"]
                    : undefined
                  : undefined
                : undefined
              : undefined
            : undefined
        },
        ContextConfig
      >,
    ): FastifyInstance<RawServer, RawRequest, RawReply>
  }
}

type x = paths["/book/:bookId"][]
