interface Payload {
  email: string
  _id: string
  isActivated: boolean
}

class UserDto {
  email;
  id;
  isActivated;

  constructor(model: Payload) {
    this.email = model.email
    this.id = model._id
    this.isActivated = model.isActivated
  }
}

module.exports = UserDto