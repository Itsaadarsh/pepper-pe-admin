import express from 'express';
import authMiddleware from '../middlerware/authMiddleware';
import { registerUser } from '../controller/user/registerUser.controller';
import createUserValidation from '../middlerware/validation/createuser';

const router = express.Router();

router.post('/create-user', authMiddleware, createUserValidation(), registerUser);

export { router as createUserRoute };
