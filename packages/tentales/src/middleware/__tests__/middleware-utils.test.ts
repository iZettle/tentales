import { createTestConfig } from "../../__test-helpers__"
import { createConfigHooks } from "../middleware-utils"

test("It create config hooks", async () => {
  const resp = createConfigHooks(createTestConfig())
  expect(resp).toMatchSnapshot()
})
