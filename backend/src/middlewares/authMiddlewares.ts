import { ApiError } from '@/exceptions/apiError.js'
import { validateToken } from '@/service/tokenService.js'
import { Request, Response, NextFunction } from 'express'

export const authMiddlewares = (req: Request, res: Response, next: NextFunction) => {
  try {
    const autorizationHeader = req.headers.authorization
    if (!autorizationHeader) {
      return next(ApiError.UnautorizedError())
    }
    const accessToken = autorizationHeader.split(' ')[1]

    if (!accessToken) {
      return next(ApiError.UnautorizedError())
    }

    const userData = validateToken(accessToken, process.env.JWT_ACCESS_SECRET as string)

    if (!userData) {
      return next(ApiError.UnautorizedError())
    }

    req.body.user = userData

    next()
  } catch (e) {
    next(ApiError.UnautorizedError())
  }
}
