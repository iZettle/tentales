/* tslint:disable no-any no-empty */

import Koa from "koa"
import supertest from "supertest"
import { errorMiddleware } from "./error-middleware"
import { createTestMw, createTestMwConfig } from "./__test-helpers__"
import { AuthError } from "../errors"

describe("Incoming request", () => {
  test("It does not do anything on the way down", async () => {
    // Setup
    const app = new Koa()
    app.use(errorMiddleware(createTestMwConfig()))
    app.use(createTestMw())
    const request = supertest.agent(app.listen())

    // Perform
    return request.get(`/foo`).expect(200, "Next body")
  })
})

describe("Outgoing request", () => {
  test("It catches runtime errors on the way up", async done => {
    // Setup
    const emitStub = jest.fn()
    const app = new Koa()
    app.use(
      createTestMw({
        fn: ctx => {
          ctx.app.emit = emitStub
        },
      }),
    )
    app.use(errorMiddleware(createTestMwConfig()))
    app.use(
      createTestMw({
        fn: ctx => {
          // tslint:disable-next-line no-unused-expression
          ctx.apa.boll.not.exists
        },
      }),
    )
    const request = supertest.agent(app.listen())

    // Perform
    await request
      .get(`/foo`)
      .expect(500)
      .expect((res: any) => {
        expect(res.res.text).toEqual(
          expect.stringContaining('{ "error": "Unknown error" }'),
        )
      })

    expect(emitStub).toHaveBeenCalledTimes(1)

    done()
  })

  test("It catches thrown error", async done => {
    // Setup
    const emitStub = jest.fn()
    const app = new Koa()
    app.use(
      createTestMw({
        fn: ctx => {
          ctx.app.emit = emitStub
        },
      }),
    )
    app.use(errorMiddleware(createTestMwConfig()))
    app.use(
      createTestMw({
        fn: ctx => {
          ctx.throw()
        },
      }),
    )
    const request = supertest.agent(app.listen())

    // Perform
    await request
      .get(`/foo`)
      .expect(500)
      .expect((res: any) => {
        expect(res.res.text).toEqual('{ "error": "Unknown error" }')
      })

    expect(emitStub).toHaveBeenCalledTimes(1)

    done()
  })

  test("It catches thrown error, with custom message", async done => {
    // Setup
    const emitStub = jest.fn()
    const customError = new Error("Custom error message") as any
    customError.status = 500
    customError.expose = true
    const expectedError = customError
    const app = new Koa()
    app.use(
      createTestMw({
        fn: ctx => {
          ctx.app.emit = emitStub
        },
      }),
    )
    app.use(errorMiddleware(createTestMwConfig()))
    app.use(
      createTestMw({
        fn: () => {
          throw customError
        },
      }),
    )
    const request = supertest.agent(app.listen())

    // Perform
    await request
      .get(`/foo`)
      .expect(500)
      .expect((res: any) => {
        expect(res.res.text).toEqual('{ "error": "Custom error message" }')
      })

    expect(emitStub).toHaveBeenCalledTimes(1)
    expect(emitStub).toHaveBeenCalledWith(
      expect.anything(),
      expectedError,
      expect.anything(),
    )

    done()
  })

  test("It doesn't output non-exposed error messages", async done => {
    // Setup
    const emitStub = jest.fn()
    const customError = new Error("Should not be seen") as any
    customError.status = 500
    customError.expose = false
    const expectedError = customError
    const app = new Koa()
    app.use(
      createTestMw({
        fn: ctx => {
          ctx.app.emit = emitStub
        },
      }),
    )
    app.use(errorMiddleware(createTestMwConfig()))
    app.use(
      createTestMw({
        fn: () => {
          throw customError
        },
      }),
    )
    const request = supertest.agent(app.listen())

    // Perform
    await request
      .get(`/foo`)
      .expect(500)
      .expect((res: any) => {
        expect(res.res.text).toEqual('{ "error": "Unknown error" }')
      })

    expect(emitStub).toHaveBeenCalledTimes(1)
    expect(emitStub).toHaveBeenCalledWith(
      expect.anything(),
      expectedError,
      expect.anything(),
    )

    done()
  })

  test("It understands class based custom errors", async done => {
    // Setup
    const emitStub = jest.fn()
    const customError = new AuthError()
    const expectedError = customError
    const app = new Koa()
    app.use(
      createTestMw({
        fn: ctx => {
          ctx.app.emit = emitStub
        },
      }),
    )
    app.use(errorMiddleware(createTestMwConfig()))
    app.use(
      createTestMw({
        fn: () => {
          throw customError
        },
      }),
    )
    const request = supertest.agent(app.listen())

    // Perform
    await request
      .get(`/foo`)
      .expect(401)
      .expect((res: any) => {
        expect(res.res.text).toEqual('{ "error": "Auth error" }')
      })

    expect(emitStub).toHaveBeenCalledTimes(0)

    done()
  })
})
