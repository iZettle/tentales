function data(/* dataConfig */ _, /* tentales */ { log }) {
  log.verbose("Up")
  return async request => {
    log.verbose("Got request", request)
    return {
      databaseResult: {
        page: request.payload
      }
    }
  }
}

module.exports = data
