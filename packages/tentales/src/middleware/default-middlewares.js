const bodyParser = require("koa-bodyparser")
const renderMiddleware = require("./middlewares/render-middleware")
const fourOhFourMiddleware = require("./middlewares/four-oh-four-middleware")
const errorMiddleware = require("./middlewares/error-middleware")

bodyParser.ttName = "Body parser"

const DEFAULT_MIDDLEWARES = [
  ["first", [errorMiddleware, bodyParser]],
  ["render", [renderMiddleware]],
  ["last", [fourOhFourMiddleware]]
]

module.exports = DEFAULT_MIDDLEWARES
