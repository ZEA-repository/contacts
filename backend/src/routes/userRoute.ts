import { Request, Response, Router } from 'express'
import User from '../../models/userModel';

const router = Router()

router.get('/users', async (req: Request, res: Response) => {
  const users = await User.find({})
  return res.status(200).send(users)
})

router.post('/users', async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone } = req.query;
  const user = new User({
    firstName,
    lastName,
    email,
    phone,
  });

  return await user.save();
})

export default router 