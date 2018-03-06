import { Middleware } from "tentales"
import { path } from "ramda"
import { isServiceRoute } from "../../utils/url"
import { readToken } from "../../utils/token"
import { verify } from "jsonwebtoken"
import { AuthError } from "../errors"

export const protectServiceRoutesMiddleware: Middleware = ({ config }) => {
  const secret = path(["auth", "serverSecret"], config) as string | Buffer
  return async function actualProtectServiceRoutesMiddleware(ctx, next) {
    if (isServiceRoute(ctx.request.URL.pathname)) {
      try {
        verify(readToken(ctx), secret)
      } catch (_) {
        throw new AuthError()
      }
    }

    await next()
  }
}

protectServiceRoutesMiddleware.displayName = "Protect Service Routes"
