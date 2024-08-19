import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './persistence/prisma.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [AuthModule, NatsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
