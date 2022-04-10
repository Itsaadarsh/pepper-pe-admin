import express from 'express';
import { adminLogin } from '../controller/adminAuth/adminAuth.controller';
import loginValidation from '../middlerware/validation/login';

const router = express.Router();

router.post('/login', loginValidation(), adminLogin);

export { router as adminAuthRoute };
