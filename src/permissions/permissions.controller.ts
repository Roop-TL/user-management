import { Body, Post, Controller, Get } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('permissions')
export class PermissionContoller {
  constructor(private readonly permissionService: PermissionService) {}
  @Post('add')
  async addPermission(
    @Body('permissionType') permissionType: string,
    @Body('activities') activities: string[],
  ) {
    const res = await this.permissionService.addPermission(
      permissionType,
      activities,
    );
    if (res) {
      return { msg: 'Permission Successfully added' };
    }
  }
  @Get()
  async getPermissions() {
    const res = await this.permissionService.getPermissions();
    return res;
  }
}
