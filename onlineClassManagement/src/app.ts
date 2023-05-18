import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

require('dotenv').config();

import * as middlewares from './middlewares/validators';
import userRouter from './api/router/user';
import adminRouter from './api/router/admin';
import userDetailsRouter from './api/router/userDetails';
import categoryRouter from './api/router/category';
import courseRouter from './api/router/course';
import DataResponse from './api/interfaces/DataResponse';
import { dbConnect } from './db';


const port = process.env.PORT || 7000;

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
dbConnect();

app.get<{}, DataResponse>('/', (req, res) => {
  res.json({
    message: 'Welcome!!',
  });
});


app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/userdetail', userDetailsRouter);
app.use('/category', categoryRouter);
app.use('/course', courseRouter);

app.use(middlewares.apiNotFound);
app.use(middlewares.errorHandler);



app.listen(port, () => {  
  console.log(`Successfully server running at : http://localhost:${port}`);
});
