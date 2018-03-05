import { uppercaseFirst } from "./string"
import { Log } from "tentales-log"
import { ServiceCaller } from "tentales"

export function logRemoteServices({
  serviceCallers,
  logger,
}: {
  serviceCallers: ServiceCaller[]
  logger: (serviceName: string) => Log
}): void {
  serviceCallers.forEach(({ config, name }) => {
    if (config.host !== "this") {
      const serviceLog = logger(`${uppercaseFirst(name)} Service`)
      serviceLog.info(`Using remote service at ${config.host}`)
    }
  })
}
