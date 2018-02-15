declare module "npmlog" {
  interface Log {
    level: string
    silly(...rest: any[]): void
    verbose(...rest: any[]): void
    info(...rest: any[]): void
    warn(...rest: any[]): void
    error(...rest: any[]): void
  }
  const log: Log
  export = log
}
