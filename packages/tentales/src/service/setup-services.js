const fetch = require("node-fetch")
const logger = require("../utils/logger")

function setupServices(config) {
  const services = {}
  const middlewares = Object.keys(config.services)
    .map(serviceName => {
      const log = logger.createServiceLogger(`${serviceName} service`)
      const ttServiceLog = logger.createServiceLogger(`tt -> ${serviceName}`)

      /**
       * Access services
       */
      const serviceConfig = config.services[serviceName]
      services[serviceName] = async ({ type, payload }) => {
        const host =
          serviceConfig.host === "this"
            ? `http://localhost:${config.port}`
            : serviceConfig.host
        ttServiceLog(`Calling service on ${host}${serviceConfig.path}`)
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
       * Setup services on local server
       */
      if (serviceConfig.host !== "this") {
        // eslint-disable-next-line array-callback-return
        return
      }

      // eslint-disable-next-line global-require, import/no-dynamic-require
      const serviceModule = require(`tentales-${serviceName}`)
      const service = serviceModule(serviceConfig, { services, log })

      // eslint-disable-next-line consistent-return
      return [
        `${serviceName}Service`,
        [
          () => async (ctx, next) => {
            if (ctx.request.URL.pathname === `${serviceConfig.path}`) {
              ctx.body = await service(ctx.request.body)
            } else {
              await next()
            }
          }
        ]
      ]
    })
    .filter(Boolean)

  return {
    services,
    middlewares
  }
}

module.exports = setupServices
