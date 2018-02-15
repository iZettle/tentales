import { TenTalesService } from "tentales/src/types"

export const editor: TenTalesService = (
  /* dataConfig */ _,
  /* tentales */ { log },
) => {
  log.info("Started")
  return async action => {
    log.silly("Received action", JSON.stringify(action))
    return { editor: "editor" }
  }
}
