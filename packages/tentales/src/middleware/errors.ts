/* tslint:disable max-classes-per-file */

export class TenTalesNetworkError extends Error {
  protected status: number
  protected expose: boolean

  constructor({
    message,
    status = 500,
    expose = true,
  }: {
    message?: string
    status?: number
    expose?: boolean
  }) {
    super(message)
    this.status = status
    this.expose = expose
  }
}

export class AuthError extends TenTalesNetworkError {
  constructor() {
    super({ message: "Auth error", status: 401 })
  }
}
