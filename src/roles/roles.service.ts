import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './roles.model';
import { Model } from 'mongoose';
import { Permission } from 'src/permissions/permissions.models';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel('Roles') private readonly roleModel: Model<Role>,
    @InjectModel('Permissions')
    private readonly permissionModel: Model<Permission>,
  ) {}
  async createRole(roleName: string, permission: object[]) {
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

  async assignPermission(roleId: string, permissionId: string) {
    try {
      const role = await this.roleModel.findOne({ _id: roleId });
      const permission = await this.permissionModel.findOne({
        _id: permissionId,
      });
      if (!permission || !role) {
        return "permission or role doesn't exists";
      }
      console.log(role);
      console.log(permission);
      const givePermission = permission.permissionType;
      const getActivities = permission.activities;
      const permissionObj = {
        name: givePermission,
        activities: getActivities,
      };
      role.permission.forEach((permission) => {
        if (permission['name'] === givePermission) {
          return 'The permission already exists for the given role';
        }
      });
      await this.roleModel.updateOne(
        { _id: roleId },
        { $push: { permission: permissionObj } },
      );
      return 'Successfully Assigned Permission to the given role!';
    } catch (error) {
      throw new NotFoundException('Incorrect Role Id');
    }
  }
}
