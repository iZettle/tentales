import Koa from "koa"
import supertest from "supertest"
import { bodyParserMiddleware } from "../body-parser-middleware"
import { createTestMw, createTestMwConfig } from "../__test-helpers__"

describe("Incoming request", () => {
  test("It does parse the body", async done => {
    // Setup
    const app = new Koa()
    let body = ""
    app.use(bodyParserMiddleware(createTestMwConfig()))
    app.use(
      createTestMw({
        fn: ctx => {
          body = ctx.request.body
        },
      }),
    )

    const request = supertest.agent(app.listen())

    // Perform
    await request
      .post(`/foo`)
      .send({ name: "Emil" })
      .expect(200, "Next body")

    expect(body).toEqual({ name: "Emil" })

    done()
  })
})
