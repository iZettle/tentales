function router(routerConfig, tentales) {
  console.log("Router up")
  return async (ctx, next) => {
    const page = await tentales.services.data({
      type: "getPage",
      payload: ctx.request.URL.pathname
    })
    const html = await tentales.services.render({
      type: "render",
      payload: page
    })

    ctx.body = html
  }
}

// END SERVICES

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
      const host = serviceConfig.host === "localhost" ? `${serviceConfig.host}:${config.port}` : serviceConfig.host
      console.log(`[${serviceName}] Calling service on http://${host}${serviceConfig.path}`)
      const response = await fetch(`http://${host}${serviceConfig.path}`, { type, payload })
      return await response.json()
    }

    /**
     * Start services on local server
     */
    if (serviceConfig.host !== "localhost") {
      return
    }

    console.log(`[${serviceName}]`, "Setting up service on local server")
    const setupService = require(`tentales-${serviceName}`)
    const service = setupService(serviceConfig, { services })

    server.use(async (ctx, next) => {
      if (ctx.request.URL.pathname === `${serviceConfig.path}`) {
        console.log(`[${serviceName}]`, "Middleware called")
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
    console.log("")
    console.log("Running services:", localServices)
    console.log("Ten Tales is up on port", config.port)
    console.log("")
  })
}
