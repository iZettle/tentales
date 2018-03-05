import Koa from "koa"
import supertest from "supertest"
import { protectServiceRoutesMiddleware } from "../protect-service-routes-middelware"
import { createTestMw, createTestMwConfig } from "../../../__test-helpers__"
import { sign } from "jsonwebtoken"

describe("Incoming request", () => {
  test("It lets non-service urls through", async () => {
    // Setup
    const app = new Koa()
    app.use(protectServiceRoutesMiddleware(createTestMwConfig()))
    app.use(createTestMw())
    const request = supertest.agent(app.listen())

    // Perform
    return request.get(`/foo`).expect(200, "Next body")
  })

  test("It rejects if no JWT is given", async () => {
    // Setup
    const app = new Koa()
    app.use(protectServiceRoutesMiddleware(createTestMwConfig()))
    app.use(createTestMw())
    const request = supertest.agent(app.listen())

    // Perform
    return request.get(`/tt/renderer`).expect(401, "Auth error")
  })

  test("It rejects if wrong JWT is given", async () => {
    // Setup
    const app = new Koa()
    app.use(protectServiceRoutesMiddleware(createTestMwConfig()))
    app.use(createTestMw())
    const request = supertest.agent(app.listen())

    // Perform
    return request
      .get(`/tt/renderer`)
      .set("Authorization", "Bearer iamnotworhy")
      .expect(401, "Auth error")
  })

  test("It let the request through if correct JWT is given", async () => {
    // Setup
    const app = new Koa()
    app.use(protectServiceRoutesMiddleware(createTestMwConfig()))
    app.use(createTestMw())
    const request = supertest.agent(app.listen())
    const token = sign({}, "test-secret")

    // Perform
    return request
      .get(`/tt/renderer`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200, "Next body")
  })
})
