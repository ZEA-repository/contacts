import { Schema, model } from 'mongoose'
import type { ITokenModel } from '@/types/token.js'

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

const UserModel = model<ITokenModel>('Token', tokenSchema)

export default UserModel
