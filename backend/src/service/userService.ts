import UserModel from '@/models/userModel'
import { sendActivationMail } from '@/service/mailService'
import { generateTokens, saveToken, removeToken, validateToken, findToken } from '@/service/tokenService'
import UserDto from '@/dtos/userDto'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { ApiError } from '@/exceptions/apiError'
import type { IUserDto, Registration } from '@/types/user'

export const userDtoWithTokens = async (user: IUserDto) => {
  const userDto = new UserDto(user)
  const tokens = await generateTokens({ ...userDto })
  await saveToken(userDto.id, tokens.refreshToken)
  return {
    ...tokens,
    user: userDto,
  }
}

export const registration = async (args: Registration) => {
  const { email, password, name, phone, terms } = args
  const guest = await UserModel.findOne({ email })

  if (guest) {
    throw ApiError.BadRequest(`email: ${email} already exist`)
  }

  const encryptPassword = await bcrypt.hash(password, 3)

  const activationLink = uuidv4()
  const user = await UserModel.create({ email, password: encryptPassword, activationLink, name, phone, terms })

  await sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`)

  const response = await userDtoWithTokens(user)
  return response
}

export const activate = async (activationLink: string) => {
  const user = await UserModel.findOne({ activationLink })
  if (!user) {
    throw ApiError.BadRequest(`incorrect activation link`)
  }
  user.isActivated = true
  await user.save()
}

export const login = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email })

  if (!user) {
    throw ApiError.BadRequest(`User ${email} not found`)
  }

  const isPasswordEquals = await bcrypt.compare(password, user.password)

  if (!isPasswordEquals) {
    throw ApiError.BadRequest('incorrect password')
  }

  const response = await userDtoWithTokens(user)
  return response
}

export const logout = async (refreshToken: string) => {
  const token = await removeToken(refreshToken)
  return token
}

export const refresh = async (refreshToken: string) => {
  if (!refreshToken) {
    throw ApiError.UnautorizedError()
  }

  const userData = validateToken(refreshToken, process.env.JWT_REFRESH_SECRET as string)
  const tokenFromDb = await findToken(refreshToken)

  if (!userData || !tokenFromDb) {
    throw ApiError.UnautorizedError()
  }
  const user = await UserModel.findById(userData)
  if (!user) return
  const response = await userDtoWithTokens(user)
  return response
}

export const getAllUsers = async () => {
  const user = UserModel.find()
  return user
}
