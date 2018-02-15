function fourOhFourMiddlewareFactory() {
  return async function FourOhFourMiddleware(ctx) {
    ctx.body = "Nothing was found"
  }
}
fourOhFourMiddlewareFactory.ttName = "Four Oh Four"

module.exports = fourOhFourMiddlewareFactory
