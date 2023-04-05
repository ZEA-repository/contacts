import TokenModel from '@/models/tokenModel.js'
// import jwt from 'jsonwebtoken';
// const jwt = require('jsonwebtoken');
import { sign, verify } from 'jsonwebtoken'

interface Payload {
  email: string
  id: string
  isActivated: boolean
}

export default class TokenService {
  async generateTokens(payload: Payload) {
    const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
    const refreshToken = sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    //FIXME: сейчас по одному пользователю находится один токен и при заходе с другого устройства токен перезатрется
    const tokenData = await TokenModel.findOne({ user: userId })
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await TokenModel.create({ user: userId, refreshToken })
    return token
  }

  async removeToken(refreshToken: string) {
    const tokenData = await TokenModel.deleteOne({ refreshToken })
    return tokenData
  }

  async findToken(refreshToken: string) {
    const tokenData = await TokenModel.findOne({ refreshToken })
    return tokenData
  }

  validateToken(token: string, secretToken: string) {
    try {
      const userData = verify(token, secretToken)
      return userData
    } catch (e) {
      return null
    }
  }
}
