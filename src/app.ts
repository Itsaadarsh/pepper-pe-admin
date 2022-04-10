import express from 'express';
import cors from 'cors';
import { adminAuthRoute } from './routes/adminAuth.route';
import { json } from 'body-parser';
import { createUserRoute } from './routes/createUser.route';
import { depositWithdrawRoute } from './routes/deptWith.route';
import { getAllUsersRoute } from './routes/getAllUsers.route';

const app = express();

app.use(json());
app.use(cors());

app.use('/api/admin', adminAuthRoute);
app.use('/api/admin', createUserRoute);
app.use('/api/admin', depositWithdrawRoute);
app.use('/api/admin', getAllUsersRoute);

export { app };
