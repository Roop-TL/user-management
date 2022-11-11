import { Body, Post, Controller, Get } from '@nestjs/common';
import { RoleService } from './roles.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Post('create')
  async createRole(
    @Body('roleName') roleName: string,
    @Body('permission') permission: string[],
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
}
