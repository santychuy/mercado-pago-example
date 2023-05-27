import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import PaymentRouter from './routes/payment';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/payment', PaymentRouter);

export default app;
