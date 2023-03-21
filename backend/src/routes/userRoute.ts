import { Request, Response, Router } from 'express'
import UserModel from '~/models/userModel';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';


const router = Router()

router.get('/users', async (_, res: Response) => {
  const users = await UserModel.find({})
  return users ? res.status(200).send(users) : res.send({ message: 'Users not found' });
})

router.put('/user/:id', async (req: Request, res: Response) => {
  const userId = new mongoose.Types.ObjectId(req.params.id);
  const user = await UserModel.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    const updatedUser = await user.save();
    res.send({ ...updatedUser });
  }
});

router.post('/user', async (req: Request, res: Response) => {
  const { name, email, phone } = req.body;
  const user = new UserModel({
    id: faker.datatype.uuid(),
    name,
    email,
    phone,

  });
  res.send(await user.save());
})

router.delete('/user/:id', async (req: Request, res: Response) => {
  const userId = new mongoose.Types.ObjectId(req.params.id);
  const user = await UserModel.findById({ _id: userId })
  return user ? user.deleteOne() : res.send({ message: 'UserModel cannot be deleted' });
});

export default router 