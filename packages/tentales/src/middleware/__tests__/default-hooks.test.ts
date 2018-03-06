import { getDefaultHooks } from "../default-hooks"
import { createTestLogger, createTestConfig } from "../../__test-helpers__"

test("It gets public default hooks", async () => {
  const log = createTestLogger()
  const config = createTestConfig()
  config.public = true

  const resp = getDefaultHooks({ log, config })
  expect(resp).toMatchSnapshot()
})

test("It gets private default hooks", async () => {
  const log = createTestLogger()
  const config = createTestConfig()
  config.public = false

  const resp = getDefaultHooks({ log, config })
  expect(resp).toMatchSnapshot()
})
