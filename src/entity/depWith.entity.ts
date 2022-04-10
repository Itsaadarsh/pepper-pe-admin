import mongoose from 'mongoose';

const depositWithdrawSchema = new mongoose.Schema(
  {
    account_number: { type: mongoose.Schema.Types.Number, required: true },
    amount: { type: mongoose.Schema.Types.Decimal128, required: true },
    remarks: { type: mongoose.Schema.Types.String, required: true },
  },
  { timestamps: true }
);

export interface DEPOSIT_WITHDRAW_SCHEMA extends mongoose.Document {
  account_number: number;
  amount: number;
  remarks: string;
}

const depWithEntity = mongoose.model<DEPOSIT_WITHDRAW_SCHEMA>('deposit_withdraw_log', depositWithdrawSchema);

export default module.exports = depWithEntity;
