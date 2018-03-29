import { Middleware } from "tentales"
import serve, { Options } from "koa-static"
import { resolve } from "path"

export interface StaticMiddlewareParams extends Options {
  root: string
}

export type StaticMiddleware = (props: StaticMiddlewareParams) => Middleware

const serveStatic: StaticMiddleware = ({ root, ...otherOptions }) => () =>
  serve(root, {
    defer: false,
    ...otherOptions,
  })

// serveStatic.displayName = "Static"

export default serveStatic
