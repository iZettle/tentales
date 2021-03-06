import { curryN } from "ramda"
// @ts-ignore Npm log does not have typings, so import as any
import log from "npmlog"

log.level = process.env.LOG_LEVEL || "info"

/* tslint:disable no-any */
export interface Log {
  silly(...rest: any[]): void
  verbose(...rest: any[]): void
  info(...rest: any[]): void
  warn(...rest: any[]): void
  error(...rest: any[]): void
}
/* tslint:enable */

export function createLog(appName: string): Log {
  return {
    silly: curryN(2, log.silly)(appName),
    verbose: curryN(2, log.verbose)(appName),
    info: curryN(2, log.info)(appName),
    warn: curryN(2, log.warn)(appName),
    error: curryN(2, log.error)(appName),
  }
}
