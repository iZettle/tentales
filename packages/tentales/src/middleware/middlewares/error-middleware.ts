import { Middleware } from "tentales"

export const errorMiddleware: Middleware = () =>
  async function actualErrorMiddleware(ctx, next) {
    try {
      await next()
    } catch (err) {
      ctx.status = 500
      ctx.type = "text/html"
      ctx.body = "Something went wrong!"

      ctx.app.emit("error", err, ctx)
    }
  }

errorMiddleware.displayName = "Error"
