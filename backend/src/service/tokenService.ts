import TokenModel from '../models/tokenModel'
import { sign, verify } from 'jsonwebtoken'
import { BadRequestError } from '../exceptions/apiError'
interface Payload {
  login: string
  id: string
  isActivated: boolean
}

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export const generateTokens = async (payload: Payload) => {
  const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '15m' })
  const refreshToken = sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '30d' })
  return {
    accessToken,
    refreshToken,
  }
}

export const saveToken = async (userId: string, refreshToken: string) => {
  //FIXME: сейчас по одному пользователю находится один токен и при заходе с другого устройства токен перезатрется
  const tokenData = await TokenModel.findOne({ user: userId })

  if (tokenData) {
    tokenData.refreshToken = refreshToken
    return tokenData.save()
  }
  const token = await TokenModel.create({ user: userId, refreshToken })
  return token
}

export const removeToken = async (refreshToken: string | undefined) => {
  const tokenData = await TokenModel.deleteOne({ refreshToken })
  if (!tokenData) throw new BadRequestError('Refresh token not deleted')
  return tokenData
}

export const findToken = async (refreshToken: string) => {
  const tokenData = await TokenModel.findOne({ refreshToken })
  if (!tokenData) throw new BadRequestError('Refresh token not found')
  return tokenData
}

export const validateToken = (token: string, secretToken: string) => {
  try {
    const userData = verify(token, secretToken)
    return userData
  } catch (e) {
    return null
  }
}
