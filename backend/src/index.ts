import 'module-alias/register'
import 'dotenv/config'
import { connect } from 'mongoose'
import express from 'express'
import cors from 'cors'
import userRoute from '@/routes/userRoute.js'
import authRoute from '@/routes/authRoute.js'
import cookieParser from 'cookie-parser'

import { errorMiddlewares } from '@/middlewares/errorMiddlewares.js'

const main = async () => {
  await connect(process.env.MONGO_URL as string)
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(cookieParser())

  app.use('/api/', userRoute)
  app.use('/', authRoute)

  app.use(errorMiddlewares)

  app.listen(4001, async () => {
    console.log('Server running on port 4001')
  })
}

main().catch((err) => {
  console.log(err)
})
