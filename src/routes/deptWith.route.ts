import express from 'express';
import authMiddleware from '../middlerware/authMiddleware';
import depWithValidation from '../middlerware/validation/depWith';
import { depWithController } from '../controller/depWith/depositWithdraw.controller';

const router = express.Router();

router.post('/deposit-withdraw', authMiddleware, depWithValidation(), depWithController);

export { router as depositWithdrawRoute };
