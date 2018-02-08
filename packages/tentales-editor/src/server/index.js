function editor(/* dataConfig */ _, /* tentales */ { log }) {
  log.verbose("Up")
  return async (/* { type, payload } */) => {
    log.verbose("Got request")
    return { editor: "editor" }
  }
}

module.exports = editor
