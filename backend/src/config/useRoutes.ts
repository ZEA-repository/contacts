import { Express, Router } from 'express'
import { authRoute, userRoute } from '@/routes'
export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  app.use(authRoute)
  app.use(userRoute)
}
