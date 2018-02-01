function data(/* dataConfig, tentales */) {
  console.log("[data] Up")
  return async () => {
    console.log("[data] Got request")
    return { databaseResult: "boll" }
  }
}

module.exports = data
