import { ApiError } from '@/exceptions/apiError'
import { Request, Response } from 'express'

function errorMiddlewares(err: Error, req: Request, res: Response) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }
  res.status(500).json({ message: `Status code 500: ${err.message}`, errors: err })
}

export { errorMiddlewares }
