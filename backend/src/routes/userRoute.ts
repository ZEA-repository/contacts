import { Request, Response, Router } from 'express'
import User from '~/models/userModel';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';


const router = Router()

router.get('/users', async (_, res: Response) => {
  const users = await User.find({})
  return users ? res.status(200).send(users) : res.send({ message: 'Users not found' });
})

router.put('/users/:id', async (req: Request, res: Response) => {
  const userId = new mongoose.Types.ObjectId(req.params.id);
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    const updatedUser = await user.save();
    const { _id, name, email, phone } = updatedUser
    res.send({
      _id,
      name,
      email,
      phone,
    });
  }
});

router.post('/users', async (req: Request) => {
  const { name, email, phone } = req.query;
  const user = new User({
    id: faker.datatype.uuid(),
    name,
    email,
    phone,
  });

  return await user.save();
})

router.delete('/users/:id', async (req: Request, res: Response) => {
  const userId = new mongoose.Types.ObjectId(req.params.id);
  const user = await User.findById({ _id: userId })
  return user ? user.deleteOne() : res.send({ message: 'User cannot be deleted' });
});

export default router 