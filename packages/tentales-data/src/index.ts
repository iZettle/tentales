import { TenTalesService } from "tentales/src/types"

export const data: TenTalesService = (
  /* dataConfig */ _,
  /* tentales */ { log },
) => {
  log.info("Started")
  return async action => {
    log.silly("Received action", JSON.stringify(action))
    return {
      databaseResult: {
        page: `${action.payload.pathname} data from data service`,
      },
    }
  }
}
