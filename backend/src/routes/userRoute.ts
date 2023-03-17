import { Request, Response, Router } from 'express'
import User from '../../models/userModel';
import { faker } from '@faker-js/faker';


const router = Router()

router.get('/users', async (res: Response) => {
  const users = await User.find({})
  return res.status(200).send(users)
})

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

export default router 