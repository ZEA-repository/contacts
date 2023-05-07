import { Request, Response, Router, NextFunction } from 'express'
import { refresh } from '../../service/userService'
import { maxAgeCookie } from '../../config'
import { BadTokenError, NoDataError } from '@/exceptions/apiError'
const router = Router()

router.get('/refresh', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies
    if (!refreshToken) throw new BadTokenError('Refresh token not found')

    const userData = await refresh(refreshToken)
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
