import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UploadFileDto {
  @IsString()
  filename: string;
  @IsString()
  file: string; // Base64 string
}

export class UploadResponse {
  @Expose()
  @IsOptional()
  fileUrl?: string;

  @Expose()
  @IsOptional()
  message?: string;
}