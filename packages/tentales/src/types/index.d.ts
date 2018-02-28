import * as Koa from "koa"
import { Log } from "tentales-log"

export type ServiceName = "renderer" | "data" | "editor"

type HookName =
  | "beforeErrorMiddleware"
  | "errorMiddleware"
  | "first"
  | "beforeBodyParserMiddleware"
  | "bodyParserMiddleware"
  | "beforeRenderMiddleware"
  | "renderMiddleware"
  | "afterRenderMiddleware"
  | "beforeServices"
  | "rendererService"
  | "editorService"
  | "dataService"
  | "afterServices"
  | "fourOhFourMiddleware"
  | "beforeFourOhFourMiddleware"
  | "last"

export interface Config {
  port: number
  reactComponentsDirectory: string
  services: { [K in ServiceName]: ServiceConfig }
  hooks?: {
    middlewares?: { [K in HookName]?: Middleware[] }
  }
}

export interface Action<T> {
  type: string
  payload: {
    [property: string]: T
  }
}

export type ServiceFactory = (
  config: ServiceConfig,
  { log, services }: { log: Log; services: Services },
) => Service

export interface ServiceResponse {
  // TODO: Define the response from the services
  [property: string]: any
}

export type Service = <T>(action: Action<T>) => Promise<ServiceResponse>

export interface ServiceCaller {
  func: Service
  name: string
  config: ServiceConfig
}

export interface ServiceConfig {
  host: string
  path: string
}

export interface Services {
  renderer: Service
  data: Service
  editor: Service
}

export interface Middleware {
  ({ services, log }: { services: Services; log: Log }): Koa.Middleware
  displayName?: string
}

export type Hook = [HookName, Middleware[]]
