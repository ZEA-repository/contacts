import { AuthFailureError } from '../exceptions/apiError'
import { validateToken } from '../service/tokenService'
import { Request, Response, NextFunction } from 'express'

export const authMiddlewares = (req: Request, res: Response, next: NextFunction) => {
  try {
    const autorizationHeader = req.headers.authorization
    if (!autorizationHeader) throw new AuthFailureError('Permission denied')

    const accessToken = autorizationHeader.split(' ')[1]

    if (!accessToken) throw new AuthFailureError('Permission denied')

    const userData = validateToken(accessToken, process.env.JWT_ACCESS_SECRET as string)

    if (!userData) throw new AuthFailureError('Permission denied')

    req.body.user = userData

    return next()
  } catch (e) {
    next(e)
  }
}
