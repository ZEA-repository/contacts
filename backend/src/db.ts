import { connect } from 'mongoose';
import dotenv from 'dotenv';
// import { initDB } from './init_db'


dotenv.config({ path: './config.env' });

export const connectionDB = async () => {
  await connect(process.env.MONGO_URL as string)
  // initDB()
}


