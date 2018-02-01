// TODO: Remove eslint-disable once import of sibling dependency is figured out
// eslint-disable-next-line import/no-extraneous-dependencies
const tenTales = require("tentales")
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
      host: "this",
      path: "/tt/data"
    },
    editor: {
      host: "this",
      path: "/tt/editor"
    }
  }
})
