// eslint-disable no-console

function logger(serviceName) {
  return (...args) => {
    if (serviceName) {
      console.log(`[${serviceName}]`, ...args)
    } else {
      console.log(...args)
    }
  }
}

module.exports = {
  logger,
  console: logger()
}
