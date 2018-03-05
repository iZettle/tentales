import { createServiceHooks } from "../create-service-hooks"
import { createTestConfig } from "../../__test-helpers__"
import { createServiceCallers } from "../../service/create-service-callers"

test("It creates service hooks", async () => {
  const serviceCallers = createServiceCallers(createTestConfig())
  const resp = createServiceHooks(serviceCallers)
  expect(resp).toMatchSnapshot()
})
