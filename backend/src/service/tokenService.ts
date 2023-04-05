import TokenModel from '~/models/tokenModel';
// import jwt from 'jsonwebtoken';
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken'

interface Payload {
  email: string
  id: string
  isActivated: boolean
}

class TokenService {
  async generateTokens(payload: Payload) {
    const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
    // const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '30m' })
    // const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
    return {
      // accessToken, refreshToken
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
      const userData = jwt.verify(token, secretToken)
      return userData
    } catch (e) {
      return null
    }
  }
}

module.exports = new TokenService()