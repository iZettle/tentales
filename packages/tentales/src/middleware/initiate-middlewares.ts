import { createLog } from "tentales-log"
import Koa from "koa"
import { Services, Hook, Middleware, HookName } from "../types"

const HOOKS_ORDER = [
  "beforeErrorMiddleware",
  "errorMiddleware",
  "first",
  "beforeBodyParserMiddleware",
  "bodyParserMiddleware",
  "beforeRenderMiddleware",
  "renderMiddleware",
  "afterRenderMiddleware",
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
  hooks,
  server,
  services,
}: {
  hooks: Hook[]
  server: Koa
  services: Services
}): void {
  const log = createLog("TT")
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
      const mwLog = createLog(`${mwName} middleware`)
      server.use(
        middleware({
          services,
          log: mwLog,
        }),
      )
      mwLog.verbose("Started")
    })
  })
}
