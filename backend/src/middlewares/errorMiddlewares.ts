import { ApiError } from '@/exceptions/apiError'
import { Request, Response, NextFunction } from 'express'

// interface CustomError {
//   status: number
//   message?: string
//   errors?: []
// }

function errorMiddlewares(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }
  // return res.status(500).json({ message: 'Status code 500' })
  res.status(500)
  res.render('error', { error: err })
}

export { errorMiddlewares }
