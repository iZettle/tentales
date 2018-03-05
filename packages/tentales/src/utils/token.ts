import * as Koa from "koa"
import { sign, SignOptions } from "jsonwebtoken"
import { pathOr, nth, defaultTo, pipe, split } from "ramda"

export function mintToken(
  secret: string | Buffer,
  options?: SignOptions,
): string {
  return sign({}, secret, options)
}
export const readToken: (ctx: Koa.Context) => string = pipe(
  pathOr("", ["request", "headers", "authorization"]),
  split(" "),
  nth(1),
  defaultTo(""),
)
