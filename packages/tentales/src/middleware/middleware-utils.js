function getHookMiddlewaresFromConfig(config) {
  if (!config.hooks || !config.hooks.middlewares) {
    return []
  }

  return Object.keys(config.hooks.middlewares).reduce((acc, name) => {
    acc.push([name, config.hooks.middlewares[name]])
    return acc
  }, [])
}

module.exports = { getHookMiddlewaresFromConfig }
