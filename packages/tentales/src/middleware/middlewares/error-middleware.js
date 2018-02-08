function errorMiddlewareFactory() {
  return async function errorMiddleware(ctx, next) {
    try {
      await next()
    } catch (err) {
      ctx.status = 500
      ctx.type = "text/html"
      ctx.body = "Something went wrong!"

      ctx.app.emit("error", err, ctx)
    }
  }
}
errorMiddlewareFactory.ttName = "Error"

module.exports = errorMiddlewareFactory
