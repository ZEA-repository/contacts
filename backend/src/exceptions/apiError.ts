export class ApiError extends Error {
  // __proto__: any

  constructor(public status: number, public message: string, public errors = []) {
    super(message)
    this.status = status
    this.errors = errors

    // restore prototype chain
    // const actualProto = new.target.prototype
    // if (Object.setPrototypeOf) {
    //   Object.setPrototypeOf(this, actualProto)
    // } else {
    //   this.__proto__ = actualProto
    // }
  }

  static UnautorizedError() {
    return new ApiError(401, 'User not autorized')
  }
  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors)
  }
}
