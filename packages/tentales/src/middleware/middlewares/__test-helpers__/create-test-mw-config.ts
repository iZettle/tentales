import { always } from "ramda"

export function createTestMwConfig() {
  const ttConfig = {
    port: 12345,
    public: true,
    auth: {
      serverSecret: "",
    },
    reactComponentsDirectory: "",
    services: {
      renderer: {
        host: "this",
        path: "/tt/renderer",
      },
      data: {
        host: "this",
        path: "/tt/data",
      },
      editor: {
        host: "this",
        path: "/tt/editor",
      },
    },
    hooks: {
      middlewares: {},
    },
  }

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
    config: ttConfig,
  }
}
