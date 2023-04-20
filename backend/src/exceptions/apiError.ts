export class ApiError extends Error {
  constructor(public status: number, public message: string, public errors = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnautorizedError(): { status: number; message: string; errors: never[] } {
    return new ApiError(401, 'User not autorized')
  }
  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors)
  }
}
