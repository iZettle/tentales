import { ServiceFactory } from "tentales/src/types"

export const editor: ServiceFactory = (
  /* dataConfig */ _,
  /* tentales */ { log },
) => {
  log.info("Started")
  return async action => {
    log.silly("Received action", JSON.stringify(action))
    return { editor: "editor" }
  }
}
