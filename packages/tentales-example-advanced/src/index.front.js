// TODO: Remove eslint-disable once import of sibling dependency is figured out
// eslint-disable-next-line import/no-extraneous-dependencies
const tenTales = require("tentales").tenTales
const path = require("path")

tenTales({
  port: 4000,
  reactComponentsDirectory: path.join(__dirname, "components"),
  services: {
    renderer: {
      host: "this",
      path: "/tt/renderer"
      // cache: "s3"
    },
    data: {
      host: "http://localhost:4001",
      path: "/tt/data"
    },
    editor: {
      host: "http://localhost:4001",
      path: "/tt/editor"
    }
  }
})
