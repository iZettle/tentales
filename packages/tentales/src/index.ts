import Koa from "koa"
import { createLog } from "tentales-log"
import { createServiceCallers } from "./service/create-service-callers"
import { createServiceHooks } from "./middleware/create-service-hooks"
import { initiateMiddlewares } from "./middleware/initiate-middlewares"
import { convertServiceMethodsToServices } from "./service/utils"
import { createConfigHooks } from "./middleware/middleware-utils"
import { getDefaultHooks } from "./middleware/default-hooks"
import { Config } from "tentales"
import { logRemoteServices } from "./utils/loggers"

const log = createLog("TT")
export function tenTales(config: Config): void {
  const server = new Koa()
  const serviceCallers = createServiceCallers(config)
  const serviceHooks = createServiceHooks(serviceCallers)

  logRemoteServices(serviceCallers)

  initiateMiddlewares({
    server,
    services: convertServiceMethodsToServices(serviceCallers),
    hooks: [
      ...getDefaultHooks({ isPublic: config.public }),
      ...serviceHooks,
      ...createConfigHooks(config),
    ],
  })

  server.listen(config.port, () => {
    log.info("\nTen Tales is up on port", config.port, "\n")
  })
}
