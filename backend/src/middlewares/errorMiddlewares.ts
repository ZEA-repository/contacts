import { ApiError } from '@/exceptions/apiError.js'
import { Request, Response } from 'express'

interface CustomError {
  status: number
  message?: string
  errors?: []
}

export const errorMiddlewares = (err: CustomError, req: Request, res: Response) => {
  console.log('🚀 ~ file: errorMiddlewares.ts:11 ~ err:', err)

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }
  return res.status(500).json({ message: 'Status code 500' })
}
