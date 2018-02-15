import { TenTalesService } from "tentales/src/types"

export const renderer: TenTalesService = (
  /* dataConfig */ _,
  /* tentales */ { log, services },
) => {
  log.info("Started")
  return async action => {
    log.silly("Received action", JSON.stringify(action))
    // const components = resolveComponents(tentales.reactComponentsDirectory)

    // return ReactDOM.renderToString(
    //   <components.RootServer
    //     page={page}
    //     sections={components.sections}
    //     properties={components.properties}
    //   />
    // )

    const data = await services.data({
      type: "getPage",
      payload: action.payload,
    })

    return {
      html: `<html><h1>Hello from ${data.databaseResult.page}</h1></html>`,
    }
  }
}
