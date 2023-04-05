export interface IUserDto {
  email: string
  _id: string
  isActivated: boolean
}

export interface IUserModel extends IUserDto {
  id: any
  name: string
  email: string
  password: string
  isActivated: boolean
  activationLink: string
  phone: string
  avatar: string
}