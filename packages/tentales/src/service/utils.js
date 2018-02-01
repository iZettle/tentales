function convertServiceMethodsToServices(serviceMethods) {
  return serviceMethods.reduce((acc, method) => {
    acc[method.name] = method.func
    return acc
  }, {})
}

module.exports = {
  convertServiceMethodsToServices
}
