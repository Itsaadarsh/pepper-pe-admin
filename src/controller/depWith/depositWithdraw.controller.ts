import express from 'express';
import { DEPOSIT_WITHDRAW_SCHEMA } from '../../entity/depWith.entity';
import { isAccountNumberAvailableRepo } from '../../repository/user/register.repo';
import validate from '../../middlerware/reqBodyValidation';
import { updateAccountBalanceRepo } from '../../repository/depWith/depWith.repo';
import { producerEmit } from '../../kafka/producer';

export const depWithController = async (req: express.Request, res: express.Response) => {
  try {
    // Server side validation
    if (validate(req, res)) {
      return;
    }

    const { account_number, remarks, amount }: DEPOSIT_WITHDRAW_SCHEMA = req.body;

    if (amount <= 0) {
      res.status(201).json({ error: true, data: { message: [`Amount should be greater than rupees 0`] } });
      return;
    }

    if (remarks == 'WITHDRAW' || remarks == 'DEPOSIT') {
      const isAccountNumberValid = await isAccountNumberAvailableRepo(account_number);
      if (isAccountNumberValid.length === 0) {
        res.status(201).json({ error: true, data: { message: [`Invalid account number!`] } });
        return;
      }

      if (remarks == 'WITHDRAW' && amount > isAccountNumberValid[0].account_balance) {
        res.status(201).json({
          error: true,
          data: {
            message: [
              `Insufficient funds, your account balance is rupees ${isAccountNumberValid[0].account_balance}`,
            ],
          },
        });
        return;
      }

      await updateAccountBalanceRepo(account_number, remarks, amount, isAccountNumberValid[0]);
      res.status(201).json({
        error: false,
        data: {
          message: [
            `Amount of Rupees ${amount} is successfully ${remarks}ED, your account balance is rupees ${isAccountNumberValid[0].account_balance}`,
          ],
        },
      });

      const kafkaData = JSON.stringify({
        account_number: account_number,
        account_balance: isAccountNumberValid[0].account_balance,
        remarks: remarks,
        amount: amount,
      });

      await producerEmit('pp_user_topic', kafkaData, 'depWithCreated');
      return;
    } else {
      res.status(201).json({ error: true, data: { message: [`Invalid remarks!`] } });
      return;
    }
  } catch (err) {
    res.status(201).json({ error: true, data: { message: [err.message] } });
  }
};
