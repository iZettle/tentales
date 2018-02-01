const fetch = require("node-fetch")
const createLog = require("tentales-log")

function createServiceCallers(config) {
  return Object.keys(config.services).map(serviceName => {
    const log = createLog("TT")
    const serviceConfig = config.services[serviceName]
    const func = async action => {
      const actionString = JSON.stringify(action)
      const host =
        serviceConfig.host === "this"
          ? `http://localhost:${config.port}`
          : serviceConfig.host
      log.silly(`Calling service on ${host}${serviceConfig.path}`)
      // TODO, add timeout
      const response = await fetch(`${host}${serviceConfig.path}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: actionString
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
