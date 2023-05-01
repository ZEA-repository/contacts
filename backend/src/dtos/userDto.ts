import type { IUserDto } from '@/types/user'

export default class UserDto {
  login
  id
  isActivated

  constructor(model: IUserDto) {
    this.login = model.login
    this.id = model._id
    this.isActivated = model.isActivated
  }
}
