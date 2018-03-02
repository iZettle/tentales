export function isServiceRoute(url: string): boolean {
  return url.startsWith("/tt/") // TODO, Move to config
}
