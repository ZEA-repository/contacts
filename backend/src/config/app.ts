import setupMiddlewares from './useMiddlewares'
import setRoutes from './useRoutes'

import { connect } from 'mongoose'
import express from 'express'

import { errorMiddlewares } from '@/middlewares/errorMiddlewares.js'

const app = express()
const main = async () => {
  await connect(process.env.MONGO_URL as string)
  setupMiddlewares(app)
  setRoutes(app)
  app.use(errorMiddlewares)
}

main().catch((err) => {
  console.log(err)
})

export default app
