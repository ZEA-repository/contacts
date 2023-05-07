import { Request, Response, Router, NextFunction } from 'express'
import { activateAccountByLink } from '../../service/mailService'
import { maxAgeCookie } from '../../config'
import UserModel from '../../models/userModel'
import { sendActivationMail } from '../../service/mailService'
import { userDtoWithTokens } from '../../dtos/userDto'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { BadRequestError } from '../../exceptions/apiError'

const router = Router()

export interface Registration {
  username: string
  login: string
  password: string
  phone: string
  terms: boolean
}

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { login, password, username, phone, terms }: Registration = req.body
    const guest = await UserModel.findOne({ login })
    if (guest) throw new BadRequestError('User already registered')

    const encryptPassword = await bcrypt.hash(password, 3)

    const activationLink = uuidv4()
    const user = await UserModel.create({ login, password: encryptPassword, activationLink, username, phone, terms })

    await sendActivationMail(login, `${process.env.API_URL}/activate/${activationLink}`)

    const userData = await userDtoWithTokens(user)
    res.cookie('refreshToken', userData?.refreshToken, {
      maxAge: maxAgeCookie,
      httpOnly: true,
    })

    return res.json(userData)
  } catch (e) {
    next(e)
  }
})

router.get('/activate/:link', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { link } = req.params
    await activateAccountByLink(link)
    return res.redirect(process.env.CLIENT_URL as string)
  } catch (e) {
    next(e)
  }
})

export default router
