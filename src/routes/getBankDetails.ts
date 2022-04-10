import express from 'express';
import authMiddleware from '../middlerware/authMiddleware';
import { getBankDetailsController } from '../controller/adminAuth/getBankDetails.controller';

const router = express.Router();

router.get('/get-bank-details', authMiddleware, getBankDetailsController);

export { router as getBankDetails };
