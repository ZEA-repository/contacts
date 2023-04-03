import { Request, Response, Router, NextFunction } from 'express'
const userService = require('@/service/userService');


const router = Router()

router.post('/registration', async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  const userData = await userService.registration(email, password)
  const maxAgeCookie = 30 * 24 * 60 * 60 * 1000 //like a refresh token
  res.cookie('refreshToken', userData.refreshToken, {

    maxAge: maxAgeCookie,
    httpOnly: true
  })
  return res.json(userData)
})

router.get('/activate/:link', async (req: Request, res: Response) => {
  const { link } = req.params
  await userService.activate(link)
  return res.redirect(process.env.CLIENT_URL as string)
});

router.post('/login', async (req: Request, res: Response) => {

})

router.post('/logout', async (req: Request, res: Response) => {

});
router.get('/refresh', async (req: Request, res: Response) => {

});


export default router 