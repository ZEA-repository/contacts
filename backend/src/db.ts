import { connect } from 'mongoose';
import dotenv from 'dotenv';
// import UserModel from '~/models/userModel';
// import { users } from '@/utils/createUsers'


dotenv.config({ path: './.env.local' });

const connectionDB = async () => {
  await connect(process.env.MONGO_URL as string)
}

export const initDB = async () => {
  connectionDB()

  // const count = await UserModel.countDocuments({}).exec()
  // if (!count) await UserModel.collection.insertMany(users)
}



