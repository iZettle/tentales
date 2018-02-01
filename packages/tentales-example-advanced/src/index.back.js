// TODO: Remove eslint-disable once import of sibling dependency is figured out
// eslint-disable-next-line import/no-extraneous-dependencies
const tenTales = require("tentales-common")
const path = require("path")

tenTales({
  port: 4001,
  reactComponentsDirectory: path.join(__dirname, "components"),
  services: {
    renderer: {
      host: "localhost:4000",
      path: "/tt/renderer"
    },
    data: {
      host: "localhost",
      path: "/tt/data"
      // persistence: "postgres"
    },
    editor: {
      host: "localhost",
      path: "/tt/editor"
    }
  }
})
