import UserModel from '~/models/userModel';
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';
const MailService = require('@/service/mailService')
const tokenService = require('@/service/tokenService')
const UserDto = require('~/dtos/userDto')


class UserService {
  async registration(email: string, password: string) {
    const guest = await UserModel.findOne({ email })

    if (guest) {
      throw new Error(`email: ${email} already exist`)
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
      throw new Error(`incorrect activation link`)
    }
    user.isActivated = true
    await user.save()
  }
}

module.exports = new UserService()