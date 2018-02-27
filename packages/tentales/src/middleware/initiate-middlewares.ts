import { createLog } from "tentales-log"
import Koa from "koa"
import { Services, Hook, Middleware, HookName } from "../types"

const MIDDLEWARE_ORDER = [
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
  middlewares,
  server,
  services,
}: {
  middlewares: Hook[]
  server: Koa
  services: Services
}): void {
  const log = createLog("TT")
  const middlewaresMap = new Map()
  middlewares.forEach(([name, functions]) => {
    if (middlewaresMap.get(name)) {
      log.warn(
        `Overwriting Ten Tales default middleware(s) on hook position "${name}". This might be what you intended.`,
      )
    }
    middlewaresMap.set(name, functions)
  })

  MIDDLEWARE_ORDER.forEach(mwOrderName => {
    const middleware = middlewaresMap.get(mwOrderName)
    if (!middleware) {
      return
    }

    middleware.forEach((mw: Middleware, index: number) => {
      const series = index > 0 ? `-${index + 1}` : ""
      const mwName = mw.displayName || `${mwOrderName}${series}`
      const mwLog = createLog(`${mwName} middleware`)
      server.use(
        mw({
          services,
          log: mwLog,
        }),
      )
      mwLog.verbose("Started")
    })
  })
}
