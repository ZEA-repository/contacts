import { Schema, model } from 'mongoose'
import type { IUserModel } from '@/types/user'

const userSchema = new Schema<IUserModel>({
  username: {
    type: String,
  },
  login: {
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
  terms: {
    type: Boolean,
    default: false,
  },
  avatar: {
    url: {
      type: String,
      default: 'https://source.unsplash.com/44x44/?person',
    },
  },
})

const UserModel = model<IUserModel>('User', userSchema)

export default UserModel
