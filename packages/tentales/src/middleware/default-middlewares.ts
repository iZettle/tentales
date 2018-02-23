import { Hook } from "../types"

import bodyParser from "koa-bodyparser"
import { renderMiddleware } from "./middlewares/render-middleware"
import { fourOhFourMiddleware } from "./middlewares/four-oh-four-middleware"
import { errorMiddleware } from "./middlewares/error-middleware"

const bodyParserMiddleware = () => bodyParser()

export const DEFAULT_MIDDLEWARES: Hook[] = [
  ["first", [errorMiddleware, bodyParserMiddleware]],
  ["render", [renderMiddleware]],
  ["last", [fourOhFourMiddleware]],
]
