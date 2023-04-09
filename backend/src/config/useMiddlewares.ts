import { Express } from 'express'
import { cors, bodyParser } from '../middlewares'
import cookieParser from 'cookie-parser'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(cookieParser())
}
