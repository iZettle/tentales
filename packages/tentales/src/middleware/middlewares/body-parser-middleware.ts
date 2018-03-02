import bodyParser from "koa-bodyparser"
import { Middleware } from "tentales"
import * as Koa from "koa" // Needed for TS

export const bodyParserMiddleware: Middleware = () => bodyParser()
bodyParserMiddleware.displayName = "Body Parser"
