import * as mongoose from 'mongoose';
import { Role } from 'src/roles/roles.model';
export const UserSchema = new mongoose.Schema({
  id: { type: String, required: true },
  userFirstName: { type: String, required: true },
  userLastName: { type: String, required: false, default: null },
  userEmail: { type: String, required: true },
  userMobile: { type: Array<string>, required: true },
  orgId: { type: String, required: false, default: null },
  //userRole: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  userRole: { type: Array<string>, required: false, default: [] },
  isActive: { type: Boolean, required: false, default: true },
  createdAt: { type: Date, required: false, default: Date.now },
  updatedAt: { type: Date, required: false, default: Date.now },
  deletedAt: { type: Date, required: false, default: null },
});

export interface User extends mongoose.Document {
  id: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userMobile: string[];
  orgId: string;
  userRole: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
