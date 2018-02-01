function editor(/* dataConfig */ _, /* tentales */ { log }) {
  log("Up")
  return async () => {
    log("Got request")
    return { editor: "editor" }
  }
}

module.exports = editor
