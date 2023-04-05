import type { IUserDto } from '~/types/user'


class UserDto {
  email;
  id;
  isActivated;

  constructor(model: IUserDto) {
    this.email = model.email
    this.id = model._id
    this.isActivated = model.isActivated
  }
}

module.exports = UserDto