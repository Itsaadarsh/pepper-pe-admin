import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    admin_id: { type: mongoose.Schema.Types.Number, required: true, unique: true },
    password: { type: mongoose.Schema.Types.String, required: true },
  },
  { timestamps: true }
);

export interface ADMIN_SCHEMA extends mongoose.Document {
  admin_id: number;
  password: string;
}

const adminEntity = mongoose.model<ADMIN_SCHEMA>('admin', adminSchema);

export default module.exports = adminEntity;
