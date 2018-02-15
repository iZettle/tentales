import fetch from "node-fetch"
import { createLog } from "tentales-log"
import { Config } from "../types"
import { ServiceCaller, ServiceConfig, Action } from "../types"

function getServiceConfig(serviceName: string, config: any): ServiceConfig {
  return config.services[serviceName] as ServiceConfig
}

export function createServiceCallers(config: Config): ServiceCaller[] {
  return Object.keys(config.services).map(serviceName => {
    const log = createLog("TT")
    const serviceConfig = getServiceConfig(serviceName, config)
    const func = async (action: Action) => {
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
          "Content-Type": "application/json",
        },
        body: actionString,
      })
      return await response.json()
    }

    return {
      func,
      name: serviceName,
      config: serviceConfig,
    }
  })
}
