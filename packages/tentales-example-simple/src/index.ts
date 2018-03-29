// TODO: Remove eslint-disable once import of sibling dependency is figured out
// eslint-disable-next-line import/no-extraneous-dependencies
import { tenTales, Middleware } from "tentales"
import serve from "tentales-static"

import { join, resolve } from "path"

tenTales({
  port: parseInt(process.env.PORT as string, 10) || 4000,
  public: true,
  auth: {
    serverSecret: process.env.SERVER_SECRET,
  },
  reactComponentsDirectory: join(__dirname, "components"),
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
      beforeRenderMiddleware: [
        serve({ root: resolve(__dirname, "../public") }),
      ],
      // rendererService: [sampleMiddleware],
    },
  },
})
