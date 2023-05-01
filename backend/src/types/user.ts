export interface IUserDto {
  login: string
  _id: string
  isActivated: boolean
}

export interface IUserModel extends IUserDto {
  username: string
  login: string
  password: string
  isActivated: boolean
  activationLink: string
  phone: string
  avatar: string
  terms: boolean
}
export interface Registration {
  username: string
  login: string
  password: string
  phone: string
  terms: boolean
}
