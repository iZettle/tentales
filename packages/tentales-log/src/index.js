const ramda = require("ramda")
const log = require("npmlog")

log.level = process.env.LOG_LEVEL || "info"

const LOG_LEVELS = ["silly", "verbose", "info", "warn", "error"]

function createLog(app) {
  return LOG_LEVELS.reduce((acc, logLevel) => {
    acc[logLevel] = ramda.curryN(2, log[logLevel])(app)
    return acc
  }, {})
}

module.exports = createLog
