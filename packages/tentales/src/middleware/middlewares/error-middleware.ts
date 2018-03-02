import { createLog } from "tentales-log"
import { Middleware } from "tentales"
import { TenTalesNetworkError } from "../errors"
import { both, prop, propOr, has, ifElse, always } from "ramda"
import * as Koa from "koa"

const log = createLog("TT")

const getStatus: (e: Error) => number = propOr(500, "status")

const getErrorMessage: (e: Error) => string = ifElse(
  both(propOr(false, "expose"), has("message")),
  prop("message"),
  always("Unknown error"),
)

const isJsonRequest: (ctx: Koa.Context) => boolean = ctx =>
  ctx.accepts("application/json") === "application/json"

export const errorMiddleware: Middleware = () =>
  async function actualErrorMiddleware(ctx, next) {
    try {
      await next()
    } catch (err) {
      if (isJsonRequest(ctx)) {
        ctx.type = "application/json"
        ctx.body = `{ "error": ${JSON.stringify(getErrorMessage(err))} }`
      } else {
        ctx.type = "text/html"
        ctx.body = getErrorMessage(err)
      }

      ctx.status = getStatus(err)
      log.silly(err)

      if (!(err instanceof TenTalesNetworkError)) {
        log.error(err)
        ctx.app.emit("error", err, ctx)
      }
    }
  }

errorMiddleware.displayName = "Error"
