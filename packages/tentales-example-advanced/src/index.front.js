const { tenTales } = require("tentales")
const path = require("path")

tenTales({
  port: 4000,
  public: true,
  reactComponentsDirectory: path.join(__dirname, "components"),
  services: {
    renderer: {
      host: "this",
      path: "/tt/renderer",
      // cache: "s3"
    },
    data: {
      host: "http://localhost:4001",
      path: "/tt/data",
    },
    editor: {
      host: "http://localhost:4001",
      path: "/tt/editor",
    },
  },
})
