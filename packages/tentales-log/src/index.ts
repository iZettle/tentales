// tslint:disable-next-line
/// <reference path="./types/npmlog.d.ts" />

import { curryN } from "ramda"
import log from "npmlog"

log.level = process.env.LOG_LEVEL || "info"

export interface Log {
  silly(...rest: any[]): void
  verbose(...rest: any[]): void
  info(...rest: any[]): void
  warn(...rest: any[]): void
  error(...rest: any[]): void
}

export function createLog(appName: string): Log {
  return {
    silly: curryN(2, log.silly)(appName),
    verbose: curryN(2, log.verbose)(appName),
    info: curryN(2, log.info)(appName),
    warn: curryN(2, log.warn)(appName),
    error: curryN(2, log.error)(appName),
  }
}
