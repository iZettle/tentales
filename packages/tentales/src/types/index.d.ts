import * as Koa from "koa"
import { Log } from "tentales-log"

export interface Config {
  port: number
  reactComponentsDirectory: string
  services: {
    renderer: ServiceConfig
    data: ServiceConfig
    editor: ServiceConfig
  }
  hooks?: {
    middlewares?: {
      first?: Middleware[]
      beforeRender?: Middleware[]
      render?: Middleware[]
      afterRender?: Middleware[]
      beforeRendererService?: Middleware[]
      rendererService?: Middleware[]
      afterRendererService?: Middleware[]
      beforeEditorService?: Middleware[]
      editorService?: Middleware[]
      afterEditorService?: Middleware[]
      beforeDataService?: Middleware[]
      dataService?: Middleware[]
      afterDataService?: Middleware[]
      last?: Middleware[]
    }
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

export type Hook = [string, Middleware[]]
