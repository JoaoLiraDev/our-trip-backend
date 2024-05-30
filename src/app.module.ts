import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from '@core/database/database.module';
import { UsersModule } from './app/users/users.module';
import { ProductModule } from './app/product/product.module';
import { UploadModule } from '@core/upload/upload.module';
import { FirebaseModule } from '@core/firebase/firebase.module';
import { AllExceptionsFilter } from '@core/exception/all-exception-filter';
import { APP_FILTER } from '@nestjs/core';

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
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ]
})
export class AppModule {}
