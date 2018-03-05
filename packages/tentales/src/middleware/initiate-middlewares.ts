import { Log } from "tentales-log"
import Koa from "koa"
import {
  Middleware,
  ServiceName,
  HookName,
  Services,
  Hook,
  Config,
} from "tentales"

const HOOKS_ORDER = [
  "beforeErrorMiddleware",
  "errorMiddleware",
  "first",
  "beforeRenderMiddleware",
  "renderMiddleware",
  "afterRenderMiddleware",
  "beforeBodyParserMiddleware",
  "bodyParserMiddleware",
  "protectServiceRoutesMiddleware",
  "beforeServices",
  "rendererService",
  "editorService",
  "dataService",
  "afterServices",
  "fourOhFourMiddleware",
  "beforeFourOhFourMiddleware",
  "last",
] as HookName[]

export function initiateMiddlewares({
  logger,
  hooks,
  server,
  services,
  config,
}: {
  logger: (x: string) => Log
  hooks: Hook[]
  server: Koa
  services: Services
  config: Config
}): void {
  const log = logger("TT")
  const uniqueHooks = new Map()

  hooks.forEach(([name, functions]) => {
    if (uniqueHooks.get(name)) {
      log.warn(
        `Overwriting Ten Tales default middleware(s) on hook position "${name}". This might be what you intended.`,
      )
    }
    uniqueHooks.set(name, functions)
  })

  HOOKS_ORDER.forEach(mwOrderName => {
    const hook = uniqueHooks.get(mwOrderName)
    if (!hook) {
      return
    }

    hook.forEach((middleware: Middleware, index: number) => {
      const series = index > 0 ? `-${index + 1}` : ""
      const mwName = middleware.displayName || `${mwOrderName}${series}`
      const mwLog = logger(`${mwName} middleware`)
      server.use(
        middleware({
          services,
          log: mwLog,
          config,
        }),
      )
      mwLog.verbose("Started")
    })
  })
}
