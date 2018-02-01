function data(/* dataConfig */ _, /* tentales */ { log }) {
  log("Up")
  return async request => {
    log("Got request", request)
    return {
      databaseResult: {
        page: request.payload
      }
    }
  }
}

module.exports = data
