import { Hook } from "tentales"

import bodyParser from "koa-bodyparser"
import { renderMiddleware } from "./middlewares/render-middleware"
import { fourOhFourMiddleware } from "./middlewares/four-oh-four-middleware"
import { errorMiddleware } from "./middlewares/error-middleware"

const bodyParserMiddleware = () => bodyParser()

const DEFAULT_HOOKS_PUBLIC: Hook[] = [
  ["errorMiddleware", [errorMiddleware]],
  ["bodyParserMiddleware", [bodyParserMiddleware]],
  ["renderMiddleware", [renderMiddleware]],
  ["fourOhFourMiddleware", [fourOhFourMiddleware]],
]

const DEFAULT_HOOKS_SERVICE: Hook[] = [
  ["errorMiddleware", [errorMiddleware]],
  ["bodyParserMiddleware", [bodyParserMiddleware]],
]

export function getDefaultHooks({ isPublic }: { isPublic: boolean }): Hook[] {
  return isPublic ? DEFAULT_HOOKS_PUBLIC : DEFAULT_HOOKS_SERVICE
}
