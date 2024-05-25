import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from '@core/database/database.module';
import { UsersModule } from './app/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DataBaseModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
