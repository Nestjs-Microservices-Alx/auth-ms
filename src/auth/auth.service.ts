import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  register(data: any) {
    console.log('data', data);
    return 'Hello World!';
  }

  login(data: any) {
    console.log('data', data);
    throw new Error('Method not implemented.');
  }

  verify(data: any) {
    console.log('data', data);
    throw new Error('Method not implemented.');
  }
}
