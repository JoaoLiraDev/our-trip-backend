import { Decimal } from '@core/typing/typing';
import { IsDecimal, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  imageUrl: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  stars?: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;
}
