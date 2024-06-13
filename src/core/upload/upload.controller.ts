import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { UploadFileDto, UploadResponse } from './upload.dto';
import { Public } from 'src/app/auth/auth.decorator';

@Public()
@Controller('upload')
export class UploadController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post()
  async uploadFile(
    @Body() uploadFileDto: UploadFileDto,
  ): Promise<UploadResponse> {
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
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${blob.name}?alt=media`;
        resolve({ fileUrl: publicUrl });
      });

      blobStream.end(buffer);
    });
  }
}
