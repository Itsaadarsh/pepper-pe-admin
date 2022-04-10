import express from 'express';
import authMiddleware from '../middlerware/authMiddleware';
import { getAllUsersController } from '../controller/user/getAllUsers.controller';

const router = express.Router();

router.get('/get-users', authMiddleware, getAllUsersController);

export { router as getAllUsersRoute };
