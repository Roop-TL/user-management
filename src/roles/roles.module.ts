import { Module } from '@nestjs/common';
import { RoleSchema } from './roles.model';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleController } from './roles.controller';
import { RoleService } from './roles.service';
import { PremissionSchema } from 'src/permissions/permissions.models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Roles', schema: RoleSchema },
      { name: 'Permissions', schema: PremissionSchema },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
