import { Express } from 'express'
import cors from 'cors'
import { bodyParser } from '@/middlewares'
import cookieParser from 'cookie-parser'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(
    cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
    }),
  )
  app.use(cookieParser())
}
