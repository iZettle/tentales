function data(/* dataConfig */ _, /* tentales */ { log }) {
  log.info("Started")
  return async action => {
    log.silly("Received action", JSON.stringify(action))
    return {
      databaseResult: {
        page: `${action.payload.pathname} data from data service`
      }
    }
  }
}

module.exports = data
