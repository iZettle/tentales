import Koa from "koa"

import { createTestConfig, createTestLogger } from "../../__test-helpers__"
import { initiateMiddlewares } from "../initiate-middlewares"
import { createServiceCallers } from "../../service/create-service-callers"
import { createServiceHooks } from "../create-service-hooks"
import { convertServiceMethodsToServices } from "../../service/utils"

test("It initiates middlewares", async () => {
  const config = createTestConfig()

  const server = new Koa()
  const serviceCallers = createServiceCallers(config)
  const serviceHooks = createServiceHooks(serviceCallers)

  // Mock
  const logMock = createTestLogger()
  const logger = () => logMock

  server.use = jest.fn()

  initiateMiddlewares({
    logger,
    server,
    config,
    services: convertServiceMethodsToServices(serviceCallers),
    hooks: serviceHooks,
  })

  expect(server.use).toHaveBeenCalledTimes(3)
  expect(logMock.verbose).toHaveBeenCalledTimes(3)
  expect(logMock.verbose).toHaveBeenCalledWith("Started")
})
