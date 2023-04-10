import { Request, Response, Router, NextFunction } from 'express'
import { registration, activate, login, logout, refresh } from '@/service/userService'

export const authRoute = Router()

authRoute.post('/registration', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const userData = await registration(email, password)
    const maxAgeCookie = 30 * 24 * 60 * 60 * 1000 //like a refresh token
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: maxAgeCookie,
      httpOnly: true,
    })
    return res.json(userData)
  } catch (e) {
    next(e)
  }
})

authRoute.get('/activate/:link', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { link } = req.params
    await activate(link)
    return res.redirect(process.env.CLIENT_URL as string)
  } catch (e) {
    next(e)
  }
})

authRoute.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const userData = await login(email, password)
    const maxAgeCookie = 30 * 24 * 60 * 60 * 1000 //like a refresh token
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: maxAgeCookie,
      httpOnly: true,
    })
    return res.json(userData)
  } catch (e) {
    next(e)
  }
})

authRoute.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies
    const token = await logout(refreshToken)
    res.clearCookie('refreshToken')
    return res.json(token)
  } catch (e) {
    next(e)
  }
})

authRoute.get('/refresh', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies
    const userData = await refresh(refreshToken)
    const maxAgeCookie = 30 * 24 * 60 * 60 * 1000 //like a refresh token
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: maxAgeCookie,
      httpOnly: true,
    })
    return res.json(userData)
  } catch (e) {
    next(e)
  }
})
