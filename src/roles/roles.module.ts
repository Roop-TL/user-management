import { Module } from '@nestjs/common';
import { RoleSchema } from './roles.model';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleController } from './roles.controller';
import { RoleService } from './roles.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Roles', schema: RoleSchema }])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
