import { createLog } from "tentales-log"
import { renderer } from "tentales-renderer"
import { data } from "tentales-data"
import { editor } from "tentales-editor"
import { convertServiceMethodsToServices } from "../service/utils"
import { uppercaseFirst } from "../utils/string"
import {
  Middleware,
  MiddlewareDefinition,
  ServiceCaller,
  TenTalesService,
} from "../types"

const SERVICE_MODULES: {
  renderer: TenTalesService
  data: TenTalesService
  editor: TenTalesService
  [key: string]: TenTalesService
} = {
  renderer,
  data,
  editor,
}

export function createServiceMiddlewares(
  serviceMethods: ServiceCaller[],
): MiddlewareDefinition[] {
  return serviceMethods
    .filter(({ config }) => config.host === "this")
    .map(serviceMethod => {
      const hookName = `${serviceMethod.name}Service`
      const serviceName = `${uppercaseFirst(serviceMethod.name)} Service`

      const service = SERVICE_MODULES[serviceMethod.name](
        serviceMethod.config,
        {
          services: convertServiceMethodsToServices(serviceMethods),
          log: createLog(serviceName),
        },
      )

      const middleware: Middleware = () =>
        async function serviceMiddleware(ctx, next) {
          if (ctx.request.URL.pathname === serviceMethod.config.path) {
            ctx.body = await service(ctx.request.body)
          } else {
            await next()
          }
        }
      middleware.displayName = serviceName

      return [hookName, [middleware]] as MiddlewareDefinition
    })
}
