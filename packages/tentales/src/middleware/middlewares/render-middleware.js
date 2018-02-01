function renderMiddlewareFactory({ services, log }) {
  return async function renderMiddleware(ctx, next) {
    if (
      ctx.request.URL.pathname.startsWith("/tt/") ||
      ctx.accepts("html", "*/*") !== "html"
    ) {
      await next()
    } else {
      log("Matched http request", ctx.request.URL.pathname)
      const response = await services.renderer({
        type: "getPage",
        payload: ctx.request.URL.pathname
      })

      ctx.body = response.html
    }
  }
}

module.exports = renderMiddlewareFactory
