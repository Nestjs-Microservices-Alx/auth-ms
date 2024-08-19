import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { User } from '@prisma/client';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/persistence/services/prisma.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { JwtPayloadType } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

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
          password: bcrypt.hashSync(password, 10),
          name,
        },
      });
      delete savedUser.password;

      return {
        user: savedUser,
        token: await this.signJwtToken(user),
      };
    } catch (error) {
      throw new RpcException({ status: 400, message: error.message });
    }
  }

  async login(loginDto: LoginUserDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.findOne('email', email);
      const matchPassword = bcrypt.compareSync(password, user?.password || '');
      if (!user || !matchPassword)
        throw new RpcException({
          status: 400,
          message:
            'There was a problem logging in. Check your email and password or create an account.',
        });
      delete user.password;

      return {
        user,
        token: await this.signJwtToken(user),
      };
    } catch (error) {
      throw new RpcException({ status: 400, message: error.message });
    }
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

  private async signJwtToken(user: User) {
    const payload: JwtPayloadType = { email: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }
}
