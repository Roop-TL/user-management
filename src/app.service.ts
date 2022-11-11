import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return 'project : user-management';
  }
}
