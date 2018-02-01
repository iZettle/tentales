function data(/* dataConfig */ _, /* tentales */ { log }) {
  log("Up")
  return async ({ /* type */ __, payload }) => {
    log("Got request")
    return {
      databaseResult: {
        page: payload
      }
    }
  }
}

module.exports = data
