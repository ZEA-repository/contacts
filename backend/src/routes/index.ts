import { Router } from 'express'
import login from './access-control/login'
import logout from './access-control/logout'
import registration from './access-control/registration'
import token from './access-control/token'
import phoneBook from './phoneBook'
import user from './user'

const router = Router()

router.use('/registration', registration)
router.use('/login', login)
router.use('/logout', logout)
router.use('/token', token)
router.use('/phone-book', phoneBook)
router.use('/user', user)

export default router
