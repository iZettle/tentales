const createLog = require("tentales-log")

const MIDDLEWARE_ORDER = [
  "first",
  "beforeRender",
  "render",
  "afterRender",
  "beforeRendererService",
  "rendererService",
  "afterRendererService",
  "beforeEditorService",
  "editorService",
  "afterEditorService",
  "beforeDataService",
  "dataService",
  "afterDataService",
  "last"
]

function initiateMiddlewares({ middlewares, server, services }) {
  const log = createLog("TT")
  const middlewaresMap = new Map()
  middlewares.forEach(([name, functions]) => {
    if (middlewaresMap.get(name)) {
      log.warn(
        `Overwriting Ten Tales default middleware(s) on hook position "${name}". This might be what you intended.`
      )
    }
    middlewaresMap.set(name, functions)
  })

  MIDDLEWARE_ORDER.forEach(mwOrderName => {
    const middleware = middlewaresMap.get(mwOrderName)
    if (!middleware) {
      return
    }

    middleware.forEach((mw, index) => {
      const series = index > 0 ? `-${index + 1}` : ""
      const mwName = mw.ttName || `${mwOrderName}${series}`
      const mwLog = createLog(`${mwName} middleware`)
      server.use(
        mw({
          services,
          log: mwLog
        })
      )
      mwLog.verbose("Started")
    })
  })
}

module.exports = initiateMiddlewares