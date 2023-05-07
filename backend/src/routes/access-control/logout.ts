import { Request, Response, Router, NextFunction } from 'express'
import { logout } from '../../service/userService'
import { BadTokenError } from '@/exceptions/apiError'

const router = Router()

router.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies
    if (!refreshToken) throw new BadTokenError('Refresh token not found')

    const token = await logout(refreshToken)
    res.clearCookie('refreshToken')
    return res.json(token)
  } catch (e) {
    next(e)
  }
})

export default router
