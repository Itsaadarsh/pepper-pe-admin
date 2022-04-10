import { Request, Response } from 'express';
import { getBankDetailsRepo } from '../../repository/adminAuth/adminAuth.repo';

export const getBankDetailsController = async (_: Request, res: Response) => {
  try {
    const bankDetails = await getBankDetailsRepo();

    if (bankDetails.length == 0) {
      res.status(201).json({ error: true, data: { message: ['No details found'] } });
      return;
    }

    const stringbalance = JSON.stringify(bankDetails[0].total_bank_balance);
    const bank_bal = JSON.parse(stringbalance);
    const { $numberDecimal } = bank_bal;

    res.status(201).json({
      error: false,
      data: [
        {
          total_bank_balance: +$numberDecimal,
          total_number_of_user: bankDetails[0].number_of_users,
        },
      ],
    });
    return;
  } catch (err) {
    res.status(201).json({ error: true, data: { message: [err.message] } });
  }
};
