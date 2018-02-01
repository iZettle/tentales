const logger = require("../utils/logger")

const ttLog = logger.createServiceLogger(`tt`)

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
  const middlewaresMap = new Map()
  middlewares.forEach(([name, functions]) => {
    if (middlewaresMap.get(name)) {
      ttLog(`Overwriting middleware(s) on hook position "${name}"`)
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
      const mwLog = logger.createServiceLogger(`${mwName} middleware`)
      mwLog("Initiating")
      server.use(
        mw({
          services,
          log: mwLog
        })
      )
    })
  })
}

module.exports = initiateMiddlewares
