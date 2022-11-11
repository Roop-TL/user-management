import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from './roles/roles.module';
import { PermissionModule } from './permissions/permissions.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    PermissionModule,
    MongooseModule.forRoot('mongodb://localhost:27017/Users'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
