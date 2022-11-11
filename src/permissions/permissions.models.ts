import * as mongoose from 'mongoose';
export const PremissionSchema = new mongoose.Schema({
  permissionType: { type: String, required: true },
  activities: { type: Array<string>, required: false },
  createdAt: { type: Date, required: false, default: Date.now },
  updatedAt: { type: Date, required: false, default: Date.now },
  deletedAt: { type: Date, required: false, default: null },
});

export interface Permission extends mongoose.Document {
  permissionType: string;
  activities: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
