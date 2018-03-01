import { HookName, Middleware, Hook, Config } from "tentales"

function getMiddlewaresAtHook(
  hookName: string,
  // tslint:disable-next-line:no-any
  hookMiddlewares: any,
): Middleware[] {
  return hookMiddlewares[hookName] as Middleware[]
}

export function createConfigHooks(config: Config): Hook[] {
  if (!config.hooks || !config.hooks.middlewares) {
    return []
  }

  const hookMiddlewares = config.hooks.middlewares

  return Object.keys(config.hooks.middlewares).reduce(
    (acc, hookName) => {
      const mwDefinition: Hook = [
        hookName as HookName,
        getMiddlewaresAtHook(hookName, hookMiddlewares),
      ]
      return [...acc, mwDefinition]
    },
    [] as Hook[],
  )
}
