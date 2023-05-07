import { Schema, model, Types } from 'mongoose'
import type { IUserDto } from '../dtos/userDto'

export const DOCUMENT_NAME = 'User'
export const COLLECTION_NAME = 'users'

export interface Contact {
  _id?: Types.ObjectId
  firstname: string
  email: string
  phone: string
  avatar: { url: string }
}

export interface User extends IUserDto {
  username: string
  login: string
  password: string
  isActivated: boolean
  activationLink: string
  phone: string
  avatar: { url: string }
  terms: boolean
  contacts: Contact[]
}

const userSchema = new Schema<User>({
  login: {
    type: Schema.Types.String,
    unique: true,
    require: true,
    trim: true,
  },
  password: {
    type: Schema.Types.String,
    require: true,
  },
  isActivated: {
    type: Schema.Types.Boolean,
    default: false,
  },
  activationLink: {
    type: Schema.Types.String,
  },
  terms: {
    type: Schema.Types.Boolean,
    default: false,
  },
  username: {
    type: Schema.Types.String,
    trim: true,
  },
  avatar: {
    url: {
      type: Schema.Types.String,
      trim: true,
      default: 'https://source.unsplash.com/44x44/?person',
    },
  },
  contacts: [
    {
      firstname: {
        type: Schema.Types.String,
        trim: true,
      },
      email: {
        type: Schema.Types.String,
        trim: true,
      },
      phone: {
        type: Schema.Types.String,
        trim: true,
      },
      avatar: {
        url: {
          type: Schema.Types.String,
          trim: true,
          default: 'https://source.unsplash.com/44x44/?person',
        },
      },
    },
  ],
})

const UserModel = model<User>(DOCUMENT_NAME, userSchema, COLLECTION_NAME)

export default UserModel
