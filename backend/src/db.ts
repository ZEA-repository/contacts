import { connect } from 'mongoose';
import dotenv from 'dotenv';
import User from '~/models/userModel';
import { users } from '@/utils/createUsers'


dotenv.config({ path: './config.env' });

const connectionDB = async () => {
  await connect(process.env.MONGO_URL as string)
}

export const initDB = async () => {
  connectionDB()

  const count = await User.countDocuments({}).exec()
  if (!count) await User.collection.insertMany(users)
}



