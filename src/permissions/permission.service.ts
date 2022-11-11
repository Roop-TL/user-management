import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission } from './permissions.models';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel('Permissions')
    private readonly permissionModel: Model<Permission>,
  ) {}
  async addPermission(permissionType: string, activities: string[]) {
    try {
      const newPermission = new this.permissionModel({
        permissionType: permissionType,
        activities: activities,
      });
      const res = await newPermission.save();
      return res;
    } catch (error) {
      throw new NotFoundException();
    }
  }
  async getPermissions() {
    const permissions = await this.permissionModel.find().exec();
    return permissions.map((permission) => ({
      permissionName: permission.permissionType,
      activities: permission.activities,
    }));
  }
}
