// TODO: Remove eslint-disable once import of sibling dependency is figured out
// eslint-disable-next-line import/no-extraneous-dependencies
const tenTales = require("tentales")
const path = require("path")

tenTales({
  port: 4001,
  reactComponentsDirectory: path.join(__dirname, "components"),
  services: {
    renderer: {
      host: "http://localhost:4000",
      path: "/tt/renderer"
    },
    data: {
      host: "this",
      path: "/tt/data"
      // persistence: "postgres"
    },
    editor: {
      host: "this",
      path: "/tt/editor"
    }
  }
})
