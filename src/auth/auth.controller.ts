import { Controller } from '@nestjs/common';

import { MessagePattern } from '@nestjs/microservices';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  async register(data: any) {
    return this.authService.register(data);
  }

  @MessagePattern('auth.login.user')
  async login(data: any) {
    return this.authService.login(data);
  }

  @MessagePattern('auth.verify.user')
  async verify(data: any) {
    return this.authService.verify(data);
  }
}
