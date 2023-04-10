import setupMiddlewares from './useMiddlewares'
import setRoutes from './useRoutes'

import { connect } from 'mongoose'
import express from 'express'

import { errorMiddlewares } from '@/middlewares/errorMiddlewares'

const app = express()
setupMiddlewares(app)
setRoutes(app)
app.use(errorMiddlewares)
async function main() {
  await connect(process.env.MONGO_URL as string)
}

main().catch(console.log)

export default app
