import { Config, Hook, Middleware } from "../types"

function getMiddlewaresAtHook(
  hookName: string,
  hookMiddlewares: any,
): Middleware[] {
  return hookMiddlewares[hookName] as Middleware[]
}

export function getHookMiddlewaresFromConfig(
  config: Config,
): Hook[] {
  if (!config.hooks || !config.hooks.middlewares) {
    return []
  }

  const hookMiddlewares = config.hooks.middlewares

  return Object.keys(config.hooks.middlewares).reduce(
    (acc, hookName) => {
      const mwDefinition: Hook = [
        hookName,
        getMiddlewaresAtHook(hookName, hookMiddlewares),
      ]
      acc.push(mwDefinition)
      return acc
    },
    [] as Hook[],
  )
}
