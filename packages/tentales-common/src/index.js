const Koa = require("koa")
const bodyParser = require("koa-bodyparser")
const fetch = require("node-fetch")
const logger = require("./utils/logger")

module.exports = function tenTales(config) {
  const server = new Koa()
  const services = {}

  server.use(bodyParser())

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
        serviceConfig.host === "this"
          ? `http://localhost:${config.port}`
          : serviceConfig.host
      ttLog(`Calling service on ${host}${serviceConfig.path}`)
      const response = await fetch(`${host}${serviceConfig.path}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type,
          payload
        })
      })
      return await response.json()
    }

    /**
     * Start services on local server
     */
    if (serviceConfig.host !== "this") {
      return
    }

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
  server.listen(config.port, () => {
    logger.console("")
    logger.console("Ten Tales is up on port", config.port)
    logger.console("")
  })
}
