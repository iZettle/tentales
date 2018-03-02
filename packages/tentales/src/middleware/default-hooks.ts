import { Hook } from "tentales"
import { bodyParserMiddleware } from "./middlewares/body-parser-middleware"
import { renderMiddleware } from "./middlewares/render-middleware"
import { fourOhFourMiddleware } from "./middlewares/four-oh-four-middleware"
import { errorMiddleware } from "./middlewares/error-middleware"
import { protectServiceRoutesMiddleware } from "./middlewares/protect-service-routes-middelware"

const DEFAULT_HOOKS_PUBLIC: Hook[] = [
  ["errorMiddleware", [errorMiddleware]],
  ["bodyParserMiddleware", [bodyParserMiddleware]],
  ["renderMiddleware", [renderMiddleware]],
  ["protectServiceRoutesMiddleware", [protectServiceRoutesMiddleware]],
  ["fourOhFourMiddleware", [fourOhFourMiddleware]],
]

const DEFAULT_HOOKS_SERVICE: Hook[] = [
  ["errorMiddleware", [errorMiddleware]],
  ["bodyParserMiddleware", [bodyParserMiddleware]],
  ["protectServiceRoutesMiddleware", [protectServiceRoutesMiddleware]],
]

export function getDefaultHooks({ isPublic }: { isPublic: boolean }): Hook[] {
  return isPublic ? DEFAULT_HOOKS_PUBLIC : DEFAULT_HOOKS_SERVICE
}
