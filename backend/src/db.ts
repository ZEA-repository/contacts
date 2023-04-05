import { connect } from 'mongoose';
import dotenv from 'dotenv';


dotenv.config({ path: './.env.local' });

export const initDB = async () => {
  await connect(process.env.MONGO_URL as string)
}



