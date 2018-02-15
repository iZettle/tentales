const createLog = require("tentales-log")
const tenTalesRenderer = require("tentales-renderer")
const tenTalesData = require("tentales-data")
const tenTalesEditor = require("tentales-editor")
const { convertServiceMethodsToServices } = require("../service/utils")
const { uppercaseFirst } = require("../utils/string")

const SERVICE_MODULES = {
  renderer: tenTalesRenderer,
  data: tenTalesData,
  editor: tenTalesEditor
}

function createServiceMiddlewares(serviceMethods) {
  return serviceMethods
    .map(serviceMethod => {
      if (serviceMethod.config.host !== "this") {
        return false
      }

      const hookName = `${serviceMethod.name}Service`
      const serviceName = `${uppercaseFirst(serviceMethod.name)} Service`

      const service = SERVICE_MODULES[serviceMethod.name](
        serviceMethod.config,
        {
          services: convertServiceMethodsToServices(serviceMethods),
          log: createLog(serviceName)
        }
      )

      const middleware = function serviceMiddlewareFactory() {
        return async function serviceMiddleware(ctx, next) {
          if (ctx.request.URL.pathname === serviceMethod.config.path) {
            ctx.body = await service(ctx.request.body)
          } else {
            await next()
          }
        }
      }
      middleware.ttName = serviceName

      return [hookName, [middleware]]
    })
    .filter(Boolean)
}

module.exports = createServiceMiddlewares
