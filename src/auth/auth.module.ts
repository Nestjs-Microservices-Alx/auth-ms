import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/persistence/prisma.module';
import { NatsModule } from '../transports/nats.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [NatsModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
