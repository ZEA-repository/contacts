import type { IUserDto } from '@/types/user'

export default class UserDto {
  email
  id
  isActivated

  constructor(model: IUserDto) {
    this.email = model.email
    this.id = model._id
    this.isActivated = model.isActivated
  }
}
