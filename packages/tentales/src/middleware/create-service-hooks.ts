import { createLog } from "tentales-log"
import { renderer } from "tentales-renderer"
import { data } from "tentales-data"
import { editor } from "tentales-editor"
import { convertServiceMethodsToServices } from "../service/utils"
import { uppercaseFirst } from "../utils/string"
import {
  Middleware,
  Hook,
  ServiceCaller,
  ServiceFactory,
  ServiceName,
} from "../types"

const SERVICE_MODULES: { [K in ServiceName]: ServiceFactory } = {
  renderer,
  data,
  editor,
}

export function createServiceHooks(serviceMethods: ServiceCaller[]): Hook[] {
  return serviceMethods
    .filter(({ config }) => config.host === "this")
    .map(serviceMethod => {
      const serviceName: ServiceName = serviceMethod.name as ServiceName
      const hookName = `${serviceMethod.name}Service`
      const displayName = `${uppercaseFirst(serviceMethod.name)} Service`

      const service = SERVICE_MODULES[serviceName](serviceMethod.config, {
        services: convertServiceMethodsToServices(serviceMethods),
        log: createLog(displayName),
      })

      const middleware: Middleware = () =>
        async function serviceMiddleware(ctx, next) {
          if (ctx.request.URL.pathname === serviceMethod.config.path) {
            ctx.body = await service(ctx.request.body)
          } else {
            await next()
          }
        }
      middleware.displayName = displayName

      return [hookName, [middleware]] as Hook
    })
}
