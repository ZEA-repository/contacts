import UserModel from '~/models/userModel';
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
const MailService = require('@/service/mailService')
const tokenService = require('@/service/tokenService')
const UserDto = require('~/dtos/userDto')
const ApiError = require('~/exceptions/apiError')

class UserService {
  async registration(email: string, password: string) {
    const guest = await UserModel.findOne({ email })

    if (guest) {
      throw new ApiError.BadRequest(`email: ${email} already exist`)
    }
    const hasPassword = await bcrypt.hash(password, 3)
    const activationLink = uuidv4()
    const user = await UserModel.create({ email, password: hasPassword, activationLink })

    await MailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`)

    const userDto = new UserDto(user)
    const tokens = await tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async activate(activationLink: string) {
    const user = await UserModel.findOne({ activationLink })
    if (!user) {
      throw new ApiError.BadRequest(`incorrect activation link`)
    }
    user.isActivated = true
    await user.save()
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email })

    if (!user) {
      throw new ApiError.BadRequest(`User ${email} not found`)
    }
    const isPasswordEquals = await bcrypt.compare(password, user.password as string)
    if (!isPasswordEquals) {
      throw ApiError.BadRequest('incorrect password')
    }
    const userDto = new UserDto(user)
    const tokens = await tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto
    }
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnautorizedError()
    }
    const userData = await tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw ApiError.UnautorizedError()
    }
    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = await tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto
    }
  }

  async getAllUsers() {
    const user = UserModel.find()
    return user
  }
}

module.exports = new UserService()