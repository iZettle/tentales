function FourOhFourMiddlewareFactory() {
  return async function FourOhFourMiddleware(ctx) {
    ctx.body = "Nothing was found"
  }
}

module.exports = FourOhFourMiddlewareFactory
