const ApiError = require('~/exceptions/apiError')
import { Request, Response, NextFunction } from 'express'

interface CustomError {
  status: number;
  message?: string;
  errors?: [];
}

module.exports = function (err: CustomError, req: Request, res: Response, next: NextFunction) {
  console.log("🚀 ~ file: errorMiddlewares.ts:11 ~ err:", err)

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }
  return res.status(500).json({ message: 'Status code 500' })
}