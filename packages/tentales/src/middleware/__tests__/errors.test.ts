/* tslint:disable no-any */

import { AuthError, TenTalesNetworkError } from "../errors"

test("It creates an Auth error", async () => {
  const resp = new AuthError() as any
  expect(resp.message).toBe("Auth error")
  expect(resp.status).toBe(401)
  expect(resp.expose).toBe(true)
  expect(resp instanceof TenTalesNetworkError).toBe(true)
})
