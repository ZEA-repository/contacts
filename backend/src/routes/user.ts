import { NextFunction, Request, Response, Router } from 'express'
import UserModel from '../models/userModel'
import TokenModel from '../models/tokenModel'
import type { Contact } from '../models/userModel'
import { SuccessResponse } from '../exceptions/ApiResponse'
import { BadRequestError } from '../exceptions/apiError'
import { findToken } from '../service/tokenService'
const router = Router()

router.get('/', async (req, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies
    console.log('🚀 ~ file: user.ts:13 ~ router.get ~ refreshToken:', refreshToken)
    const userIdbyToken = await TokenModel.findOne({ refreshToken }, ['user'])
    if (!userIdbyToken) throw new BadRequestError('Refresh token not found')
    const user = await UserModel.findOne({ _id: userIdbyToken.user })
    console.log('🚀 ~ file: user.ts:17 ~ router.get ~ user:', user)
    if (!user) throw new BadRequestError('User not found')

    return res.json(user)
  } catch (e) {
    next(e)
  }
})

export default router
