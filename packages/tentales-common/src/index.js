const Koa = require("koa")
const fetch = require("node-fetch")
const logger = require("./utils/logger")

module.exports = function tenTales(config) {
  const server = new Koa()
  const services = {}

  Object.keys(config.services).forEach(serviceName => {
    /**
     * Logger
     */
    const log = logger.logger(serviceName)
    const ttLog = logger.logger(`tt -> ${serviceName}`)

    /**
     * Access services
     */
    const serviceConfig = config.services[serviceName]
    services[serviceName] = async ({ type, payload }) => {
      const host =
        serviceConfig.host === "localhost"
          ? `${serviceConfig.host}:${config.port}`
          : serviceConfig.host
      ttLog(`Calling service on http://${host}${serviceConfig.path}`)
      const response = await fetch(`http://${host}${serviceConfig.path}`, {
        type,
        payload
      })
      return await response.json()
    }

    /**
     * Start services on local server
     */
    if (serviceConfig.host !== "localhost") {
      return
    }

    ttLog("Setting up service on local server")
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const setupService = require(`tentales-${serviceName}`)
    const service = setupService(serviceConfig, { services, log })
    server.use(async (ctx, next) => {
      if (ctx.request.URL.pathname === `${serviceConfig.path}`) {
        ctx.body = await service(ctx.request.body)
      } else {
        await next()
      }
    })
  })

  /**
   * Log
   */
  const localServices = Object.keys(config.services)
    .filter(serviceName => config.services[serviceName].host === "localhost")
    .join(", ")

  server.listen(config.port, () => {
    logger.console("")
    logger.console("Running services:", localServices)
    logger.console("Ten Tales is up on port", config.port)
    logger.console("")
  })
}
