import ppBankDetailsEntity from '../../entity/ppBankDetails.entity';
import userEntity from '../../entity/user.entity';

const isEmailAvailableRepo = async (email: string) => {
  return await userEntity.find({ email });
};

const isAccountNumberAvailableRepo = async (account_number: number) => {
  return await userEntity.find({ account_number });
};

const insertUserRepo = async (
  account_number: number,
  email: string,
  hash: string,
  name: string,
  account_balance: number
) => {
  const bankDetails = await ppBankDetailsEntity.findOne({ bank_id: 1 });
  bankDetails!.number_of_users += 1;
  await bankDetails!.save();

  return await new userEntity({
    account_number,
    email,
    name,
    account_balance,
    password: hash,
  }).save();
};

const updateUserBalanceRepo = async (
  user_1: number,
  user_1_balance: number,
  user_2: number,
  user_2_balance: number
) => {
  const user_1_account = await isAccountNumberAvailableRepo(user_1);
  user_1_account[0].account_balance = user_1_balance;
  await user_1_account[0].save();

  const user_2_account = await isAccountNumberAvailableRepo(user_2);
  user_2_account[0].account_balance = user_2_balance;
  await user_2_account[0].save();
};

const getAllusersRepo = async () => {
  return await userEntity.find({});
};

export {
  isEmailAvailableRepo,
  isAccountNumberAvailableRepo,
  insertUserRepo,
  updateUserBalanceRepo,
  getAllusersRepo,
};
