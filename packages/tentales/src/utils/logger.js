function createServiceLogger(serviceName) {
  return (...args) => {
    if (serviceName) {
      // eslint-disable-next-line no-console
      console.log(`[${serviceName}]`, ...args)
    } else {
      // eslint-disable-next-line no-console
      console.log(...args)
    }
  }
}

module.exports = {
  createServiceLogger,
  plainLog: createServiceLogger()
}
