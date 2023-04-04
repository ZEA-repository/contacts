import 'module-alias/register';
import express from 'express'
import cors from 'cors';
import { initDB } from '@/db';
import userRoute from '@/routes/userRoute';
import authRoute from '@/routes/authRoute';
import cookieParser from 'cookie-parser'
const errorMiddlewares = require('~/middlewares/errorMiddlewares')


const main = async () => {
  await initDB()
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser())

  app.use('/api/', userRoute);
  app.use('/', authRoute);

  app.use(errorMiddlewares);

  app.listen(4001, async () => {
    console.log("Server running on port 4001")

  });
}


main().catch((err) => {
  console.log(err)
})