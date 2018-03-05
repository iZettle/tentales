import { Hook, Config } from "tentales"
import { Log } from "tentales-log"
import { path } from "ramda"
import { bodyParserMiddleware } from "./middlewares/body-parser-middleware"
import { renderMiddleware } from "./middlewares/render-middleware"
import { fourOhFourMiddleware } from "./middlewares/four-oh-four-middleware"
import { errorMiddleware } from "./middlewares/error-middleware"
import { protectServiceRoutesMiddleware } from "./middlewares/protect-service-routes-middelware"

const DEFAULT_HOOKS_PUBLIC = (log: Log, config: Config): Hook[] => {
  const middlewares: Hook[] = [
    ["errorMiddleware", [errorMiddleware]],
    ["bodyParserMiddleware", [bodyParserMiddleware]],
    ["renderMiddleware", [renderMiddleware]],
  ]

  if (path(["auth", "serverSecret"], config)) {
    middlewares.push([
      "protectServiceRoutesMiddleware",
      [protectServiceRoutesMiddleware],
    ])
  } else {
    log.warn(
      "Authorization secret not set; no authorization will be carried out.",
    )
  }

  middlewares.push(["fourOhFourMiddleware", [fourOhFourMiddleware]])

  return middlewares
}

const DEFAULT_HOOKS_SERVICE: Hook[] = [
  ["errorMiddleware", [errorMiddleware]],
  ["bodyParserMiddleware", [bodyParserMiddleware]],
  ["protectServiceRoutesMiddleware", [protectServiceRoutesMiddleware]],
]

export function getDefaultHooks({
  log,
  config,
}: {
  log: Log
  config: Config
}): Hook[] {
  return config.public
    ? DEFAULT_HOOKS_PUBLIC(log, config)
    : DEFAULT_HOOKS_SERVICE
}
