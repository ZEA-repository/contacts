export interface IUserDto {
  email: string
  _id: string
  isActivated: boolean
}

export interface IUserModel extends IUserDto {
  name: string
  email: string
  password: string
  isActivated: boolean
  activationLink: string
  phone: string
  avatar: string
}
