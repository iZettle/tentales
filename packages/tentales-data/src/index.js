function data(/* dataConfig */ _, /* tentales */ { log }) {
  log("Up")
  return async () => {
    log("Got request")
    return { databaseResult: "boll" }
  }
}

module.exports = data
