function editor(/* editorConfig, tentales */) {
  console.log("[editor] Up")
  return async () => {
    console.log("[editor] Got request")
    return { editor: "editor" }
  }
}

module.exports = editor
