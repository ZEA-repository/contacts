import { Schema, model } from 'mongoose'
import { Types } from 'mongoose'

export const DOCUMENT_NAME = 'Token'

export interface ITokenModel {
  user: Types.ObjectId
  refreshToken: string
}

const tokenSchema = new Schema<ITokenModel>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  refreshToken: {
    type: String,
    required: true,
  },
})

const TokenModel = model<ITokenModel>(DOCUMENT_NAME, tokenSchema)

export default TokenModel
