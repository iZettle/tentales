const Koa = require("koa")
const log = require("tentales-log")("tt")

const createServiceMethods = require("./service/create-service-methods")
const createServiceMiddlewares = require("./middleware/create-service-middlewares")
const initiateMiddlewares = require("./middleware/initiate-middlewares")
const { convertServiceMethodsToServices } = require("./service/utils")
const middlewareUtils = require("./middleware/middleware-utils")
const DEFAULT_MIDDLEWARES = require("./middleware/default-middlewares")

module.exports = function tenTales(config) {
  const server = new Koa()
  const serviceMethods = createServiceMethods(config)
  const serviceMiddlewares = createServiceMiddlewares(serviceMethods)
  initiateMiddlewares({
    server,
    services: convertServiceMethodsToServices(serviceMethods),
    middlewares: [
      ...DEFAULT_MIDDLEWARES,
      ...serviceMiddlewares,
      ...middlewareUtils.getHookMiddlewaresFromConfig(config)
    ]
  })

  server.listen(config.port, () => {
    log.info("\nTen Tales is up on port", config.port, "\n")
  })
}
