function renderer(/* dataConfig */ _, /* tentales */ { log, services }) {
  log.verbose("Up")
  return async ({ /* type, */ payload }) => {
    log.verbose("Got request")
    // const components = resolveComponents(tentales.reactComponentsDirectory)

    // return ReactDOM.renderToString(
    //   <components.RootServer
    //     page={page}
    //     sections={components.sections}
    //     properties={components.properties}
    //   />
    // )

    const data = await services.data({ type: "getPage", payload })

    return {
      html: `<html><h1>Hello from ${data.databaseResult.page}</h1></html>`
    }
  }
}

module.exports = renderer
