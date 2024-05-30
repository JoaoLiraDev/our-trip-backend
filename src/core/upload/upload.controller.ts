import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { UploadFileDto, UploadResponse } from './upload.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post()
  async uploadFile(@Body() uploadFileDto: UploadFileDto): Promise<UploadResponse>{
    const { filename, file } = uploadFileDto;

    if (!file) {
      return { message: 'No file uploaded.' };
    }

    // Decode Base64 string to buffer
    const buffer = Buffer.from(file, 'base64');

    const bucket = this.firebaseService.getStorage();
    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream();

    return new Promise((resolve, reject) => {
      blobStream.on('error', (err) => {
        reject({ message: err.message });
      });

      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve({ fileUrl: publicUrl });
      });

      blobStream.end(buffer);
    });
  }
}
