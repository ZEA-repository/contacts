import { Types } from 'mongoose'

export interface ITokenModel {
  user: Types.ObjectId
  refreshToken: string
}
export interface ITokens {
  accessToken: string
  refreshToken: string
}
