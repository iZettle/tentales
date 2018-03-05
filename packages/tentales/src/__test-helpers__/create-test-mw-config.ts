import { always } from "ramda"
import { createTestConfig } from "./create-test-config"
import { MiddlewareProps } from "tentales"

export function createTestMwConfig(): MiddlewareProps {
  return {
    services: {
      renderer: async () => await {},
      data: async () => await {},
      editor: async () => await {},
    },
    log: {
      silly: always(null),
      verbose: always(null),
      info: always(null),
      warn: always(null),
      error: always(null),
    },
    config: createTestConfig(),
  }
}
