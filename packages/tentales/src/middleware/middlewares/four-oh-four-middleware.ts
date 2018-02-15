import { Middleware } from "../../types"

export const fourOhFourMiddleware: Middleware = () =>
  async function actualFourOhFourMiddleware(ctx) {
    ctx.body = "Nothing was found"
  }

fourOhFourMiddleware.displayName = "Four Oh Four"
