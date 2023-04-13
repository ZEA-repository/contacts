import { Schema, model } from 'mongoose'
import type { IUserModel } from '@/types/user'

const userSchema = new Schema<IUserModel>({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationLink: {
    type: String,
  },
  phone: {
    type: String,
  },
  avatar: {
    type: String,
  },
})

const UserModel = model<IUserModel>('User', userSchema)

export default UserModel
