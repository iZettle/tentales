const Koa = require("koa")
const logger = require("./utils/logger")

const setupServices = require("./service/setup-services")
const initiateMiddlewares = require("./middleware/initiate-middlewares")
const middlewareUtils = require("./middleware/middleware-utils")
const DEFAULT_MIDDLEWARES = require("./middleware/default-middlewares")

module.exports = function tenTales(config) {
  const server = new Koa()
  const { services, middlewares: servicesMiddlewares } = setupServices(config)

  initiateMiddlewares({
    server,
    services,
    middlewares: [
      ...DEFAULT_MIDDLEWARES,
      ...servicesMiddlewares,
      ...middlewareUtils.getHookMiddlewaresFromConfig(config)
    ]
  })

  server.listen(config.port, () => {
    logger.plainLog("")
    logger.plainLog("Ten Tales is up on port", config.port)
    logger.plainLog("")
  })
}
