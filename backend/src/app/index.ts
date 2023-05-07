import setupMiddlewares from './useMiddlewares'
import routes from '../routes'
import { connect } from 'mongoose'
import express from 'express'
import { errorMiddlewares } from '@/middlewares/errorMiddlewares'

const app = express()
setupMiddlewares(app)

app.use('/', routes)

app.use(errorMiddlewares)
async function main() {
  await connect(process.env.MONGO_URL as string)
}

main().catch(console.log)

export default app
