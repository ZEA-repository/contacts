import TokenModel from '~/models/tokenModel';
const jwt = require('jsonwebtoken');

interface Payload {
  email: string
  id: string
  isActivated: boolean
}

class TokenService {
  async generateTokens(payload: Payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
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
}

module.exports = new TokenService()