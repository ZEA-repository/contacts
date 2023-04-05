import 'dotenv/config';
import { connect } from 'mongoose';
import express from 'express';
import cors from 'cors';
import userRoute from '@routes/userRoute';
import authRoute from '~/src/routes/authRoute';
import cookieParser from 'cookie-parser';
const errorMiddlewares = require('~/middlewares/errorMiddlewares');
const main = async () => {
    await connect(process.env.MONGO_URL);
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api/', userRoute);
    app.use('/', authRoute);
    app.use(errorMiddlewares);
    app.listen(4001, async () => {
        console.log('Server running on port 4001');
    });
};
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map