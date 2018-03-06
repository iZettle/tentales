import { Hook, Config } from "tentales"
import { Log } from "tentales-log"
import { path } from "ramda"
import { bodyParserMiddleware } from "./middlewares/body-parser-middleware"
import { renderMiddleware } from "./middlewares/render-middleware"
import { fourOhFourMiddleware } from "./middlewares/four-oh-four-middleware"
import { errorMiddleware } from "./middlewares/error-middleware"
import { protectServiceRoutesMiddleware } from "./middlewares/protect-service-routes-middelware"

const getProtectServiceRoutesMiddleware = ({
  log,
  config,
}: {
  log: Log
  config: Config
}): Hook | undefined => {
  const secret = path(["auth", "serverSecret"], config)

  if (secret) {
    return ["protectServiceRoutesMiddleware", [protectServiceRoutesMiddleware]]
  } else {
    log.warn(
      "Auth secret not set; this will disable authentication checks for all services.",
    )
  }
}

const DEFAULT_HOOKS_PUBLIC = ({
  log,
  config,
}: {
  log: Log
  config: Config
}): Hook[] =>
  [
    ["errorMiddleware", [errorMiddleware]],
    ["bodyParserMiddleware", [bodyParserMiddleware]],
    ["renderMiddleware", [renderMiddleware]],
    getProtectServiceRoutesMiddleware({ log, config }),
    ["fourOhFourMiddleware", [fourOhFourMiddleware]],
  ].filter(Boolean) as Hook[]

const DEFAULT_HOOKS_SERVICE = ({
  log,
  config,
}: {
  log: Log
  config: Config
}): Hook[] =>
  [
    ["errorMiddleware", [errorMiddleware]],
    ["bodyParserMiddleware", [bodyParserMiddleware]],
    getProtectServiceRoutesMiddleware({ log, config }),
  ].filter(Boolean) as Hook[]

export function getDefaultHooks({
  log,
  config,
}: {
  log: Log
  config: Config
}): Hook[] {
  return config.public
    ? DEFAULT_HOOKS_PUBLIC({ log, config })
    : DEFAULT_HOOKS_SERVICE({ log, config })
}
