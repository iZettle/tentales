/* tslint:disable no-empty */

export function createTestConfig() {
  return {
    port: 12345,
    public: true,
    auth: {
      serverSecret: "test-secret",
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
      middlewares: {
        beforeRenderMiddleware: [() => {}, () => {}],
        rendererService: [() => {}],
      },
    },
  }
}
