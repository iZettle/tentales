/* tslint:disable no-empty */

import Koa from "koa"
import supertest from "supertest"
import { fourOhFourMiddleware } from "./four-oh-four-middleware"
import { createTestMw, createTestMwConfig } from "./__test-helpers__"

describe("Outgoing request", () => {
  test("It answers with a 404", async () => {
    // Setup
    const app = new Koa()
    app.use(fourOhFourMiddleware(createTestMwConfig()))
    app.use(createTestMw())
    const request = supertest.agent(app.listen())

    // Perform
    return request.get(`/foo`).expect(404, "Nothing was found")
  })

  test.skip("It answers with a 404, in JSON format", async () => {})
})
