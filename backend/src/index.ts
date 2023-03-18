import 'module-alias/register';
import express from 'express'
import cors from 'cors';
import { initDB } from '@/db';
import userRoute from '@/routes/userRoute';


const main = async () => {
  initDB()

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/api/', userRoute);
  app.listen(4001, () => {
    console.log("Server running on port 4001")
  });
}


main().catch((err) => {
  console.log(err)
})