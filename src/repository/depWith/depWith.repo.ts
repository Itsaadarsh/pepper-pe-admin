import depWithEntity from '../../entity/depWith.entity';
import ppBankDetailsEntity from '../../entity/ppBankDetails.entity';

const updateAccountBalanceRepo = async (
  account_number: number,
  remarks: string,
  amount: number,
  userAccount: any
) => {
  let updateUserBal;
  let updateBankBal;
  const bankDetails = await ppBankDetailsEntity.findOne({ bank_id: 1 });

  if (remarks == 'WITHDRAW') {
    updateUserBal = +userAccount.account_balance - +amount;
    updateBankBal = +bankDetails!.total_bank_balance - +amount;
  } else {
    updateUserBal = +userAccount.account_balance + +amount;
    updateBankBal = +bankDetails!.total_bank_balance + +amount;
  }

  // Update User Balance
  userAccount.account_balance = updateUserBal;
  await userAccount.save();

  // Update Bank Log Balance
  bankDetails!.total_bank_balance = updateBankBal;
  await bankDetails!.save();

  return await new depWithEntity({
    account_number,
    remarks,
    amount,
  }).save();
};

export { updateAccountBalanceRepo };
