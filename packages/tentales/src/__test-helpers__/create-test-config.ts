/* tslint:disable no-empty */

import { Middleware } from "tentales"

export const testMiddleware: Middleware = () =>
  async function actualErrorMiddleware(ctx, next) {
    await next()
  }

testMiddleware.displayName = "Test"

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
        beforeRenderMiddleware: [testMiddleware, testMiddleware],
        rendererService: [testMiddleware],
      },
    },
  }
}
