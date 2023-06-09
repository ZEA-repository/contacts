import { Request, Response, Router, NextFunction } from 'express'
import { logout } from '../../service/userService'

const router = Router()

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies
    const token = await logout(refreshToken)
    res.clearCookie('refreshToken')
    return res.json(token)
  } catch (e) {
    next(e)
  }
})

export default router
