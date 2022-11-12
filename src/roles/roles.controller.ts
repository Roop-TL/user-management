import { Body, Post, Controller, Get, Param, Patch } from '@nestjs/common';
import { RoleService } from './roles.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Post('create')
  async createRole(
    @Body('roleName') roleName: string,
    @Body('permission') permission: object[],
  ) {
    const createStatus = await this.roleService.createRole(
      roleName,
      permission,
    );

    if (createStatus) {
      return { msg: 'Role Successfully Created' };
    }
  }
  @Get()
  async getRoles() {
    const res = await this.roleService.getRoles();
    return res;
  }
  @Patch(':roleId/assignPermission')
  async assignPermission(
    @Param('roleId') roleId: string,
    @Body('permissionId') permissionId: string,
  ) {
    const updatedRole = this.roleService.assignPermission(roleId, permissionId);
    return updatedRole;
  }
}
