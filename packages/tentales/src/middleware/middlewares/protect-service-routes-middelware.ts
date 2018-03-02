import { Middleware } from "tentales"
import { isServiceRoute } from "../../utils/url"
import { readToken } from "../../utils/token"
import { verify } from "jsonwebtoken"
import { AuthError } from "../errors"

export const protectServiceRoutesMiddleware: Middleware = ({ config }) => {
  return async function actualProtectServiceRoutesMiddleware(ctx, next) {
    if (!isServiceRoute(ctx.request.URL.pathname)) {
      await next()
    } else {
      try {
        verify(readToken(ctx), config.auth.serverSecret)
        await next()
      } catch (_) {
        throw new AuthError()
      }
    }
  }
}

protectServiceRoutesMiddleware.displayName = "Protect Service Routes"
