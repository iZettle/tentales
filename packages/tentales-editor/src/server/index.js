function editor(/* editorConfig, tentales */) {
  console.log("[editor] [actual] up")
  return async () => {
    console.log("[editor] [actual] Got request")
    return { editor: "editor" }
  }
}

module.exports = editor
