import express from 'express'
import cors from 'cors';
import { connectionDB } from './db';
import userRoute from './routes/userRoute';


const main = async () => {
  connectionDB();

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