// eslint-disable no-console

function createServiceLogger(serviceName) {
  return (...args) => {
    if (serviceName) {
      console.log(`[${serviceName}]`, ...args)
    } else {
      console.log(...args)
    }
  }
}

module.exports = {
  createServiceLogger,
  plainLog: createServiceLogger()
}
