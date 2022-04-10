import adminEntity from '../../entity/admin.entity';
import bcrypt from 'bcrypt';
import ppBankDetailsEntity from '../../entity/ppBankDetails.entity';

// All DB calls for admin login
const isAdminIDAvailableRepo = async (admin_id: number) => {
  return await adminEntity.find({ admin_id });
};

const insertAdminRepo = async (admin_id: number, password: string) => {
  const hash = await bcrypt.hash(password, 11);

  await new adminEntity({
    admin_id: admin_id,
    password: hash,
  }).save();
};

const getBankDetailsRepo = async () => {
  return await ppBankDetailsEntity.find({});
};

export { isAdminIDAvailableRepo, insertAdminRepo, getBankDetailsRepo };
