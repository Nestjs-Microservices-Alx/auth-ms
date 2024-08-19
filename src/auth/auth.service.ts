import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { User } from '@prisma/client';

import { PrismaService } from 'src/persistence/services/prisma.service';
import { LoginUserDto, RegisterUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(registerDto: RegisterUserDto) {
    try {
      const { email, password, name } = registerDto;
      const user = await this.findOne('email', email);
      if (user)
        throw new RpcException({ status: 400, message: 'User already exists' });

      // create user
      const savedUser = await this.prismaService.user.create({
        data: {
          email,
          password: password,
          name,
        },
      });

      return savedUser;
    } catch (error) {
      throw new RpcException({ status: 400, message: error.message });
    }
  }

  login(loginDto: LoginUserDto) {
    return loginDto;
  }

  verify(data: any) {
    console.log('data', data);
    return 'Verify Success!';
  }

  //
  findOne(attr: keyof User, value: any): Promise<User | null> {
    return this.prismaService.user.findFirst({
      where: {
        [attr]: value,
      },
    });
  }
}
