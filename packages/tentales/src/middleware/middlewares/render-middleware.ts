import { Middleware } from "tentales"

export const renderMiddleware: Middleware = ({ services, log }) =>
  async function actualRenderMiddleware(ctx, next) {
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
          pathname: ctx.request.URL.pathname,
        },
      })

      ctx.body = response.html
    }
  }

renderMiddleware.displayName = "Render"
