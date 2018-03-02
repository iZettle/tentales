import { startsWith } from "ramda"

export function isServiceRoute(url: string): boolean {
  return startsWith("/tt/", url) // TODO, Move to config
}
