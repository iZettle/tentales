import { Hook, Config } from "tentales"
import { Log } from "tentales-log"
import { path } from "ramda"
import { bodyParserMiddleware } from "./middlewares/body-parser-middleware"
import { renderMiddleware } from "./middlewares/render-middleware"
import { fourOhFourMiddleware } from "./middlewares/four-oh-four-middleware"
import { errorMiddleware } from "./middlewares/error-middleware"
import { protectServiceRoutesMiddleware } from "./middlewares/protect-service-routes-middelware"

export interface GetDefaultHooksParams {
  log: Log
  config: Config
}

const getProtectServiceRoutesHook = ({
  log,
  config,
}: GetDefaultHooksParams): Hook | undefined => {
  const secret = path(["auth", "serverSecret"], config)

  if (secret) {
    return ["protectServiceRoutesMiddleware", [protectServiceRoutesMiddleware]]
  } else if (process.env.NODE_ENV === "production") {
    log.error(
      "Trying to run without authentication in production mode. You need to ensure that SERVER_SECRET is set in your environment.",
    )
    process.exit(1)
  } else {
    log.warn(
      "Auth secret not set; this will disable authentication checks for all services.",
    )
  }
}

const DEFAULT_HOOKS_PUBLIC = ({ log, config }: GetDefaultHooksParams): Hook[] =>
  [
    ["errorMiddleware", [errorMiddleware]],
    ["bodyParserMiddleware", [bodyParserMiddleware]],
    ["renderMiddleware", [renderMiddleware]],
    getProtectServiceRoutesHook({ log, config }),
    ["fourOhFourMiddleware", [fourOhFourMiddleware]],
  ].filter(Boolean) as Hook[]

const DEFAULT_HOOKS_SERVICE = ({
  log,
  config,
}: GetDefaultHooksParams): Hook[] =>
  [
    ["errorMiddleware", [errorMiddleware]],
    ["bodyParserMiddleware", [bodyParserMiddleware]],
    getProtectServiceRoutesHook({ log, config }),
  ].filter(Boolean) as Hook[]

export function getDefaultHooks({
  log,
  config,
}: GetDefaultHooksParams): Hook[] {
  return config.public
    ? DEFAULT_HOOKS_PUBLIC({ log, config })
    : DEFAULT_HOOKS_SERVICE({ log, config })
}
