function renderer(rendererConfig, tentales) {
  console.log("[renderer] [actual] up")
  return async () => {
    // const components = resolveComponents(tentales.reactComponentsDirectory)

    // return ReactDOM.renderToString(
    //   <components.RootServer
    //     page={page}
    //     sections={components.sections}
    //     properties={components.properties}
    //   />
    // )

    const data = await tentales.services.data({ type: "getPage", payload: "" })

    return `<html>${JSON.stringify(data)}</html>`
  }
}

module.exports = renderer
