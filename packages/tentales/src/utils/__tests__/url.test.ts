import { isServiceRoute } from "../url"

describe("Service routes", () => {
  test("It is a service route", async () => {
    const resp = isServiceRoute("/tt/apa")
    expect(resp).toBe(true)
  })

  test("It is not a service route", async () => {
    const resp = isServiceRoute("/something")
    expect(resp).toBe(false)
  })
})
