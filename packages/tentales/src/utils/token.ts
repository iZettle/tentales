import * as Koa from "koa"
import { sign } from "jsonwebtoken"
import { pathOr, nth, defaultTo, pipe, split } from "ramda"

export function mintToken(secret: string | Buffer): string {
  return sign({}, secret)
}
export const readToken: (ctx: Koa.Context) => string = pipe(
  pathOr("", ["request", "headers", "authorization"]),
  split(" "),
  nth(1),
  defaultTo(""),
)
