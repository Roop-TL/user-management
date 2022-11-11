import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './roles.model';
import { Model } from 'mongoose';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Roles') private readonly roleModel: Model<Role>) {}
  async createRole(roleName: string, permission: string[]) {
    try {
      const newRole = new this.roleModel({
        roleName: roleName,
        permission: permission,
      });

      const res = await newRole.save();
      return res;
    } catch (error) {
      throw new NotFoundException();
    }
  }
  async getRoles() {
    const roles = await this.roleModel.find().exec();
    return roles.map((role) => ({
      role: role.roleName,
      permissions: role.permission,
    }));
  }
}
