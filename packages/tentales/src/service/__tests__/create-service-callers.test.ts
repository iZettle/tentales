import { createServiceCallers } from "../create-service-callers"
import { createTestConfig } from "../../__test-helpers__"

test("It creates service callers", async () => {
  const resp = createServiceCallers(createTestConfig())
  expect(resp).toMatchSnapshot()
})
