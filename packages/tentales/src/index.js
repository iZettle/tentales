const Koa = require("koa")
const bodyParser = require("koa-bodyparser")
const fetch = require("node-fetch")
const logger = require("./utils/logger")

const middlewareRender = require("./middlewares/render")

module.exports = function tenTales(config) {
  const server = new Koa()
  const services = {}

  server.use(bodyParser())
  server.use(
    middlewareRender({
      services,
      log: logger.createServiceLogger("renderer middleware")
    })
  )

  Object.keys(config.services).forEach(serviceName => {
    /**
     * Logger
     */
    const log = logger.createServiceLogger(serviceName)
    const ttLog = logger.createServiceLogger(`tt -> ${serviceName}`)

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
      // TODO, add timeout
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

  server.use(async (ctx, next) => {
    ctx.body = "Nothing was found"
    await next()
  })

  /**
   * Log
   */
  server.listen(config.port, () => {
    logger.plainLog("")
    logger.plainLog("Ten Tales is up on port", config.port)
    logger.plainLog("")
  })
}
