module.exports = {
  renderer: {
    plugins: [
      {
        name: "tentales-renderer-plugin-cache-in-memory",
        config: {
          ttl: 11111
        }
      }
    ]
  },
  data: {
    plugins: [
      {
        name: "tentales-data-plugin-persistance-postgres",
        config: {
          user: "",
          pass: "",
          database: ""
        }
      }
    ]
  },
  router: {
    plugins: [
      {
        name: "izettle-tentales-router-plugin-redirection",
        config: {
          url: "http://redirection.herokuapp.com"
        }
      }
    ]
  },
  editor: {
    plugins: [
      {
        name: "tentales-editor-plugin-auth-google",
        config: {
        }
      }
    ]
  }
}