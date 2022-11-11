import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionService } from './permission.service';
import { PermissionContoller } from './permissions.controller';
import { PremissionSchema } from './permissions.models';
PermissionService;

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Permissions', schema: PremissionSchema },
    ]),
  ],
  controllers: [PermissionContoller],
  providers: [PermissionService],
})
export class PermissionModule {}
