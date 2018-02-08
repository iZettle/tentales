const createLog = require("tentales-log")
const tenTalesRenderer = require("tentales-renderer")
const tenTalesData = require("tentales-data")
const tenTalesEditor = require("tentales-editor")
const { convertServiceMethodsToServices } = require("../service/utils")

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

      const service = SERVICE_MODULES[serviceMethod.name](
        serviceMethod.config,
        {
          services: convertServiceMethodsToServices(serviceMethods),
          log: createLog(`${serviceMethod.name} service`)
        }
      )

      return [
        `${serviceMethod.name}Service`,
        [
          function serviceMiddlewareFactory() {
            return async function serviceMiddleware(ctx, next) {
              if (ctx.request.URL.pathname === serviceMethod.config.path) {
                ctx.body = await service(ctx.request.body)
              } else {
                await next()
              }
            }
          }
        ]
      ]
    })
    .filter(Boolean)
}

module.exports = createServiceMiddlewares
