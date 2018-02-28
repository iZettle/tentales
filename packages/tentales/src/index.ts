import Koa from "koa"
import { createLog } from "tentales-log"
import { createServiceCallers } from "./service/create-service-methods"
import { createServiceMiddlewares } from "./middleware/create-service-middlewares"
import { initiateMiddlewares } from "./middleware/initiate-middlewares"
import { convertServiceMethodsToServices } from "./service/utils"
import { getHookMiddlewares } from "./middleware/middleware-utils"
import { DEFAULT_MIDDLEWARES } from "./middleware/default-middlewares"

import { Config } from "./types"

const log = createLog("TT")
export function tenTales(config: Config): void {
  const server = new Koa()
  const serviceMethods = createServiceCallers(config)
  const serviceMiddlewares = createServiceMiddlewares(serviceMethods)

  initiateMiddlewares({
    server,
    services: convertServiceMethodsToServices(serviceMethods),
    middlewares: [
      ...DEFAULT_MIDDLEWARES,
      ...serviceMiddlewares,
      ...getHookMiddlewares(config),
    ],
  })

  server.listen(config.port, () => {
    log.info("\nTen Tales is up on port", config.port, "\n")
  })
}
