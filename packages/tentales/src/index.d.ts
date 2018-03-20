declare module "tentales" {
  import { Log } from "tentales-log"
  import * as Koa from "koa"

  /**
   * App
   */
  export const tenTales: (config: Config) => void

  /**
   * Services
   */
  export type Service = <T>(action: Action<T>) => Promise<ServiceResponse>
  export type ServiceName = "renderer" | "data" | "editor"

  export interface Services {
    renderer: Service
    data: Service
    editor: Service
  }

  export type ServiceFactory = (
    config: ServiceConfig,
    { log, services }: { log: Log; services: Services },
  ) => Service

  export interface ServiceConfig {
    host: string
    path: string
    handler?: ServiceFactory
  }

  export interface ServiceCaller {
    func: Service
    name: string
    config: ServiceConfig
  }

  export interface ServiceResponse {
    // TODO: Define the response from the services
    // tslint:disable-next-line:no-any
    [property: string]: any
  }

  /**
   * Hooks
   */
  export type Hook = [HookName, Middleware[]]
  export type HookName =
    | "beforeErrorMiddleware"
    | "errorMiddleware"
    | "first"
    | "beforeBodyParserMiddleware"
    | "bodyParserMiddleware"
    | "beforeRenderMiddleware"
    | "renderMiddleware"
    | "afterRenderMiddleware"
    | "protectServiceRoutesMiddleware"
    | "beforeServices"
    | "rendererService"
    | "editorService"
    | "dataService"
    | "afterServices"
    | "fourOhFourMiddleware"
    | "beforeFourOhFourMiddleware"
    | "last"

  /**
   * Middlewares
   */
  export interface MiddlewareProps {
    services: Services
    log: Log
    config: Config
  }

  export interface Middleware {
    (props: MiddlewareProps): Koa.Middleware
    displayName?: string
  }

  /**
   * Actions
   */
  export interface Action<T> {
    type: string
    payload: {
      [property: string]: T
    }
  }

  /**
   * Config
   */
  export interface Config {
    port: number
    public: boolean
    auth?: {
      serverSecret?: string | Buffer
    }
    reactComponentsDirectory: string
    services: { [K in ServiceName]: ServiceConfig }
    hooks?: {
      middlewares?: { [K in HookName]?: Middleware[] }
    }
  }
}
