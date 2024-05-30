import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { UploadController } from './upload.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [
    FirebaseModule,
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
