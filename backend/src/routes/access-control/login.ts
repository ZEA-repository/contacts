import { Request, Response, Router, NextFunction } from 'express'
import { maxAgeCookie } from '../../config'
import { userDtoWithTokens } from '../../dtos/userDto'
import bcrypt from 'bcrypt'
import UserModel from '../../models/userModel'
import { BadRequestError, AuthFailureError, NoDataError } from '../../exceptions/apiError'
// import { authMiddlewares } from '@/middlewares/authMiddlewares'

const router = Router()

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { login, password } = req.body
    const user = await UserModel.findOne({ login })
    if (!user) throw new BadRequestError('User not registered')
    if (!user.password) throw new BadRequestError('Credential not set')

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new AuthFailureError('Authentication failure')

    const userData = await userDtoWithTokens(user)
    if (!userData) throw new NoDataError()

    res.cookie('refreshToken', userData?.refreshToken, {
      maxAge: maxAgeCookie,
      httpOnly: true,
    })
    return res.json(userData)
  } catch (e) {
    next(e)
  }
})

export default router
