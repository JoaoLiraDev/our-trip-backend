import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from '@core/database/database.module';
import { UsersModule } from './app/users/users.module';
import { ProductModule } from './app/product/product.module';
import { UploadModule } from '@core/upload/upload.module';
import { FirebaseModule } from '@core/firebase/firebase.module';
import { AllExceptionsFilter } from '@core/exception/all-exception-filter';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthModule } from './app/auth/auth.module';
import { AuthGuard } from './app/auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DataBaseModule,
    UsersModule,
    ProductModule,
    UploadModule,
    FirebaseModule,
    AuthModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ]
})
export class AppModule {}
