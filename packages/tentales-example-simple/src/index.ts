// TODO: Remove eslint-disable once import of sibling dependency is figured out
// eslint-disable-next-line import/no-extraneous-dependencies
import { tenTales } from "tentales"
import { Middleware } from "tentales/src/types"

import * as path from "path"

const sampleMiddleware: Middleware = ({ log }) =>
  async function actualSampleMiddleware(ctx, next) {
    log.verbose("Sample middleware - Before")
    await next()
    log.verbose("Sample middleware - After")
  }

sampleMiddleware.displayName = "Sample Middleware"

tenTales({
  port: 4000,
  reactComponentsDirectory: path.join(__dirname, "components"),
  services: {
    renderer: {
      host: "this",
      path: "/tt/renderer",
      // cache: "s3"
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
      beforeRendererService: [sampleMiddleware],
      // last: [sampleLastMiddleware]
    },
  },
})
