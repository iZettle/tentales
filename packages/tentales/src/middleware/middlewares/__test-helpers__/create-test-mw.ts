/* tslint:disable no-any no-empty */

export function createTestMw({
  body = "Next body",
  contentType = null,
  status = null,
  fn = (ctx: any) => {},
} = {}) {
  return async function nextMw(ctx: any, next: any) {
    ctx.body = body

    const header = {}

    if (contentType) {
      ctx.response.type = contentType
    }

    if (status) {
      ctx.status = status
    }

    if (header) {
      ctx.set(header)
    }

    fn(ctx)

    await next()
  }
}
