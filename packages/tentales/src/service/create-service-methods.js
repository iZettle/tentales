const fetch = require("node-fetch")
const createLog = require("tentales-log")

function createServiceCallers(config) {
  return Object.keys(config.services).map(serviceName => {
    const log = createLog(`tt -> ${serviceName}`)
    const serviceConfig = config.services[serviceName]
    const func = async ({ type, payload }) => {
      const host =
        serviceConfig.host === "this"
          ? `http://localhost:${config.port}`
          : serviceConfig.host
      log.verbose(`Calling service on ${host}${serviceConfig.path}`)
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

    return {
      func,
      name: serviceName,
      config: serviceConfig
    }
  })
}

module.exports = createServiceCallers
