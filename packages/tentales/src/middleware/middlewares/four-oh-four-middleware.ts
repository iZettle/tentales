import { Middleware } from "tentales"

export const fourOhFourMiddleware: Middleware = () =>
  async function actualFourOhFourMiddleware(ctx) {
    ctx.status = 404
    ctx.body = "Nothing was found"
  }

fourOhFourMiddleware.displayName = "Four Oh Four"
