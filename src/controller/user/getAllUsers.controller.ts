import { Request, Response } from 'express';
import { getAllusersRepo } from '../../repository/user/register.repo';

export const getAllUsersController = async (_: Request, res: Response) => {
  try {
    const userDetails = await getAllusersRepo();

    if (userDetails.length == 0) {
      res.status(400).json({ error: true, data: { message: ['No users found'] } });
      return;
    }

    const responseData: any = [];

    userDetails.forEach(user => {
      const stringbalance = JSON.stringify(user.account_balance);
      const account_bal = JSON.parse(stringbalance);
      const { $numberDecimal } = account_bal;

      responseData.push({
        name: user.name,
        account_balance: +$numberDecimal,
        account_number: user.account_number,
        email: user.email,
      });
    });

    res.status(201).json({ error: false, data: responseData });
    return;
  } catch (err) {
    res.status(400).json({ error: true, data: { message: [err.message] } });
  }
};
