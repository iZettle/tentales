import { uppercaseFirst } from "../string"

describe("String", () => {
  test("It uppercases", async () => {
    const resp = uppercaseFirst("emil öberg")
    expect(resp).toBe("Emil öberg")
  })
})
