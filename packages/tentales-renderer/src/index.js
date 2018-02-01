function renderer(/* dataConfig */ _, /* tentales */ { log, services }) {
  log("Up")
  return async () => {
    log("Got request")
    // const components = resolveComponents(tentales.reactComponentsDirectory)

    // return ReactDOM.renderToString(
    //   <components.RootServer
    //     page={page}
    //     sections={components.sections}
    //     properties={components.properties}
    //   />
    // )

    const data = await services.data({ type: "getPage", payload: "" })

    return `<html>${JSON.stringify(data)}</html>`
  }
}

module.exports = renderer
