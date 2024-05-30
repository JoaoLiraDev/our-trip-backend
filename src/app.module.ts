import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { DataBaseModule } from '@core/database/database.module';
import { UsersModule } from './app/users/users.module';
import { ProductModule } from './app/product/product.module';
import { UploadModule } from '@core/upload/upload.module';
import { FirebaseModule } from '@core/firebase/firebase.module';

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
})
export class AppModule {}
