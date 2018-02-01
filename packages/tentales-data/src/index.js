function data(/* dataConfig, tentales */) {
  console.log("[data] [actual] up")
  return async () => {
    console.log("[data] [actual] Got request")
    return { databaseResult: "boll" }
  }
}

module.exports = data
