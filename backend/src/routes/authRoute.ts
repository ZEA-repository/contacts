import { Request, Response, Router, NextFunction } from 'express'
const userService = require('@/service/userService');


const router = Router()

router.post('/registration', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const userData = await userService.registration(email, password)
    const maxAgeCookie = 30 * 24 * 60 * 60 * 1000 //like a refresh token
    res.cookie('refreshToken', userData.refreshToken, {

      maxAge: maxAgeCookie,
      httpOnly: true
    })
    return res.json(userData)
  } catch (e) {
    next(e)
  }
})

router.get('/activate/:link', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { link } = req.params
    await userService.activate(link)
    return res.redirect(process.env.CLIENT_URL as string)
  } catch (e) {
    next(e)
  }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (e) {
    next(e)
  }
})

router.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (e) {
    next(e)
  }
});

router.get('/refresh', async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (e) {
    next(e)
  }
});


export default router 