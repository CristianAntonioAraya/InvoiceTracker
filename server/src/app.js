import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoute from './routes/userRoute.js';
import invoiceRoute from './routes/invoiceRoutes.js';

const app = express();

//settings
app.set('port', process.env.PORT);
//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes

app.use('/user', userRoute);
app.use('/invoice', invoiceRoute);

export default app;
