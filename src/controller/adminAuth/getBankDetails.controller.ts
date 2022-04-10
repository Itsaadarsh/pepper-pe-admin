import { Request, Response } from 'express';
import { getBankDetailsRepo } from '../../repository/adminAuth/adminAuth.repo';

export const getBankDetailsController = async (_: Request, res: Response) => {
  try {
    const bankDetails = await getBankDetailsRepo();

    if (bankDetails.length == 0) {
      res.status(201).json({ error: true, data: { message: ['No details found'] } });
      return;
    }

    res.status(201).json({ error: false, data: [bankDetails[0]] });
    return;
  } catch (err) {
    res.status(201).json({ error: true, data: { message: [err.message] } });
  }
};
