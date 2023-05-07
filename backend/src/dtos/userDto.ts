import { generateTokens, saveToken } from '../service/tokenService'

export interface IUserDto {
  login: string
  _id: string
  isActivated: boolean
}
export default class UserDto {
  login: string
  id: string
  isActivated: boolean

  constructor(model: IUserDto) {
    this.login = model.login
    this.id = model._id
    this.isActivated = model.isActivated
  }
}

export const userDtoWithTokens = async (user: IUserDto) => {
  const userDto = new UserDto(user)
  const tokens = await generateTokens({ ...userDto })
  await saveToken(userDto.id, tokens.refreshToken)
  return {
    ...tokens,
    user: userDto,
  }
}
