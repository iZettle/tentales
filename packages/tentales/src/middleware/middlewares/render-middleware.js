function renderMiddlewareFactory({ services, log }) {
  return async function renderMiddleware(ctx, next) {
    if (
      ctx.request.URL.pathname.startsWith("/tt/") ||
      ctx.accepts("html", "*/*") !== "html"
    ) {
      await next()
    } else {
      log.silly("Acting on request")
      const response = await services.renderer({
        type: "renderPage",
        payload: {
          pathname: ctx.request.URL.pathname
        }
      })

      ctx.body = response.html
    }
  }
}
renderMiddlewareFactory.ttName = "Render"

module.exports = renderMiddlewareFactory
