import UserModel from '../models/userModel'
import { removeToken, validateToken, findToken } from '../service/tokenService'
import { userDtoWithTokens } from '../dtos/userDto'
import bcrypt from 'bcrypt'
import { BadRequestError, AuthFailureError } from '../exceptions/apiError'

export const authentication = async (login: string, password: string) => {
  const user = await UserModel.findOne({ login })
  if (!user) throw new BadRequestError('User not registered')
  if (!user.password) throw new BadRequestError('Credential not set')

  const isPasswordEquals = await bcrypt.compare(password, user.password)

  if (!isPasswordEquals) throw new BadRequestError('incorrect password')

  const response = await userDtoWithTokens(user)
  return response
}

export const logout = async (refreshToken: string | undefined) => {
  const token = await removeToken(refreshToken)
  return token
}

export const refresh = async (refreshToken: string) => {
  if (!refreshToken) throw new AuthFailureError('Authentication failure')

  const userData = validateToken(refreshToken, process.env.JWT_REFRESH_SECRET as string)
  if (!userData) throw new AuthFailureError('Authentication failure')

  await findToken(refreshToken)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const user = await UserModel.findById(userData.id)
  if (!user) throw new BadRequestError('User not found')

  const response = await userDtoWithTokens(user)
  return response
}
