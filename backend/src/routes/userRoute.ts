import { Schema } from 'mongoose'
import { NextFunction, Request, Response, Router } from 'express'
import UserModel from '@/models/userModel'
import { getAllUsers } from '@/service/userService'
import { authMiddlewares } from '@/middlewares/authMiddlewares'

export const userRoute = Router()

userRoute.get('/users', authMiddlewares, async (_, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers()
    return res.json(users)
  } catch (e) {
    next(e)
  }
})

userRoute.put('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new Schema.Types.ObjectId(req.params.id)
    const user = await UserModel.findById(userId)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.phone = req.body.phone || user.phone
      const updatedUser = await user.save()
      res.send({ ...updatedUser })
    }
  } catch (e) {
    next(e)
  }
})

userRoute.post('/user', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone } = req.body
    const user = new UserModel({
      name,
      email,
      phone,
    })
    res.send(await user.save())
  } catch (e) {
    next(e)
  }
})

userRoute.delete('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new Schema.Types.ObjectId(req.params.id)
    const user = await UserModel.findById({ _id: userId })
    return user ? user.deleteOne() : res.send({ message: 'UserModel cannot be deleted' })
  } catch (e) {
    next(e)
  }
})
