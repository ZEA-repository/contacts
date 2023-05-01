export interface User {
  _id: string
  username: string
  login: string
  phone: string
  avatar: string
}
export interface Login {
  login: string
  password: string
}
export interface Registration {
  login: string
  username: string
  phone: string
  password: string
  passwordConfirm: string
  terms?: boolean
}
