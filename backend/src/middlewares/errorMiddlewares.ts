import { ApiError, InternalError, ErrorType } from '../exceptions/apiError'
import { Request, Response } from 'express'
import { environment } from '../config'
function errorMiddlewares(err: Error, req: Request, res: Response) {
  if (err instanceof ApiError) {
    ApiError.handle(err, res)
    if (err.type === ErrorType.INTERNAL)
      res.status(500).json({ message: `Status code 500: ${err.message} - ${req.method}`, errors: err })
  }
  if (environment === 'development') res.status(500).send(err)
  ApiError.handle(new InternalError(), res)
}

export { errorMiddlewares }
