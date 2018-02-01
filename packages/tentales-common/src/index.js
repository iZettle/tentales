const Koa = require("koa")
const fetch = require("node-fetch")

module.exports = function tenTales(config) {
  const server = new Koa()
  const services = {}

  Object.keys(config.services).forEach(serviceName => {
    /**
     * Access services
     */
    const serviceConfig = config.services[serviceName]
    services[serviceName] = async ({ type, payload }) => {
      const host =
        serviceConfig.host === "localhost"
          ? `${serviceConfig.host}:${config.port}`
          : serviceConfig.host
      console.log(
        `[tt -> ${serviceName}] Calling service on http://${host}${
          serviceConfig.path
        }`
      )
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

    console.log(`[tt -> ${serviceName}]`, "Setting up service on local server")
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const setupService = require(`tentales-${serviceName}`)
    const service = setupService(serviceConfig, { services })

    server.use(async (ctx, next) => {
      if (ctx.request.URL.pathname === `${serviceConfig.path}`) {
        console.log(`[tt -> ${serviceName}]`, "Middleware called")
        ctx.body = await service(ctx.request.body)

        console.log(`[tt -> ${serviceName}]`, "Body set to:")
        console.log(ctx.body)
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
    console.log("")
    console.log("Running services:", localServices)
    console.log("Ten Tales is up on port", config.port)
    console.log("")
  })
}
