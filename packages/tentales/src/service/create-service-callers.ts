import fetch from "node-fetch"
import { createLog } from "tentales-log"
import { Action, ServiceConfig, ServiceCaller, Config } from "tentales"
import { path } from "ramda"
import { Headers } from "node-fetch"
import { mintToken } from "../utils/token"

// tslint:disable-next-line:no-any
function getServiceConfig(serviceName: string, config: any): ServiceConfig {
  return config.services[serviceName] as ServiceConfig
}

export function createServiceCallers(config: Config): ServiceCaller[] {
  const headers = new Headers()
  headers.append("Accept", "application/json")
  headers.append("Content-Type", "application/json")

  const secret = path(["auth", "serverSecret"], config) as
    | string
    | Buffer
    | undefined

  if (secret !== undefined) {
    headers.append("Authorization", `Bearer ${mintToken(secret)}`)
  }

  return Object.keys(config.services).map(serviceName => {
    const log = createLog("TT")
    const serviceConfig = getServiceConfig(serviceName, config)
    const func = async <T>(action: Action<T>) => {
      const actionString = JSON.stringify(action)
      const host =
        serviceConfig.host === "this"
          ? `http://localhost:${config.port}`
          : serviceConfig.host
      log.silly(`Calling service on ${host}${serviceConfig.path}`)
      // TODO, add timeout
      const response = await fetch(`${host}${serviceConfig.path}`, {
        method: "POST",
        headers,
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
