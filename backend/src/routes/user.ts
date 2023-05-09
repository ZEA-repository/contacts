import { NextFunction, Response, Router } from 'express'
import UserModel from '../models/userModel'
import TokenModel from '../models/tokenModel'
import { BadRequestError } from '../exceptions/apiError'

const router = Router()

router.get('/', async (req, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies
    const userIdbyToken = await TokenModel.findOne({ refreshToken }, ['user'])
    if (!userIdbyToken) throw new BadRequestError('Refresh token not found')
    const user = await UserModel.findOne({ _id: userIdbyToken.user })
    if (!user) throw new BadRequestError('User not found')

    return res.json(user)
  } catch (e) {
    next(e)
  }
})

export default router
