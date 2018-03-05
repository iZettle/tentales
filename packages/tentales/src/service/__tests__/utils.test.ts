import { createServiceCallers } from "../create-service-callers"
import { createTestConfig } from "../../__test-helpers__"
import { convertServiceMethodsToServices } from "../utils"

test("It converts service callers", async () => {
  const serviceCallers = createServiceCallers(createTestConfig())
  const resp = convertServiceMethodsToServices(serviceCallers)
  expect(resp).toMatchSnapshot()
})
