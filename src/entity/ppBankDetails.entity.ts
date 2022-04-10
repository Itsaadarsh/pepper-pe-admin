import mongoose from 'mongoose';

const ppBankDetailsSchema = new mongoose.Schema(
  {
    bank_id: { type: mongoose.Schema.Types.Number, required: true },
    total_bank_balance: { type: mongoose.Schema.Types.Decimal128, required: true },
    number_of_users: { type: mongoose.Schema.Types.Number, required: true },
  },
  { timestamps: true }
);

export interface BANKDETAILS_SCHEMA extends mongoose.Document {
  bank_id: number;
  total_bank_balance: number;
  number_of_users: number;
}

const ppBankDetailsEntity = mongoose.model<BANKDETAILS_SCHEMA>('bank_details', ppBankDetailsSchema);

export default module.exports = ppBankDetailsEntity;
