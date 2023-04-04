const ApiError = require('~/exceptions/apiError')
import { Request, Response, NextFunction } from 'express'

interface Error {
  status: number;
  message?: string;
  errors?: [];
}

module.exports = function (err: any, req: Request, res: Response, next: NextFunction) {

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }
  return res.status(500).json({ message: 'Status code 500' })
}