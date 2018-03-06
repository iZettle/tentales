import { logRemoteServices } from "../loggers"
import { createTestLogger } from "../../__test-helpers__"

describe("Loggers", () => {
  test("It logs remote service", async () => {
    const loggerMock = createTestLogger()
    const mock = {
      serviceCallers: [
        {
          name: "first",
          config: {
            host: "http://www.example.com",
          },
        },
        {
          name: "second",
          config: {
            host: "this",
          },
        },
      ],
      logger: () => loggerMock,
    }

    // @ts-ignore: not real serviceCaller object
    logRemoteServices(mock)

    expect(loggerMock.info).toHaveBeenCalledTimes(1)
    expect(loggerMock.info).toHaveBeenCalledWith(
      "Using remote service at http://www.example.com",
    )
  })
})
