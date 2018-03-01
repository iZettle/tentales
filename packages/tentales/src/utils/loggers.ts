import { uppercaseFirst } from "./string"
import { createLog } from "tentales-log"
import { ServiceCaller } from "tentales"

export function logRemoteServices(serviceCallers: ServiceCaller[]): void {
  serviceCallers.forEach(({ config, name }) => {
    if (config.host !== "this") {
      const serviceLog = createLog(`${uppercaseFirst(name)} Service`)
      serviceLog.info(`Using remote service at ${config.host}`)
    }
  })
}
