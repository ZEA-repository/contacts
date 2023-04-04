import TokenModel from '~/models/tokenModel';
const jwt = require('jsonwebtoken');
const ApiError = require('~/exceptions/apiError')
interface Payload {
  email: string
  id: string
  isActivated: boolean
}

class TokenService {
  async generateTokens(payload: Payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30s' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
    return {
      accessToken, refreshToken
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

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }
  validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (e) {
      return null
    }
  }



}

module.exports = new TokenService()