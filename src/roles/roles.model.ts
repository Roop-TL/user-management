import * as mongoose from 'mongoose';
export const RoleSchema = new mongoose.Schema({
  roleName: { type: String, required: true },
  permission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission',
    required: false,
  },
  createdAt: { type: Date, required: false, default: Date.now },
  updatedAt: { type: Date, required: false, default: Date.now },
  deletedAt: { type: Date, required: false, default: null },
});

export interface Role extends mongoose.Document {
  roleName: string;
  permission: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
