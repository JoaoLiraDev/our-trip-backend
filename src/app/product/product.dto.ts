import { Decimal } from '@core/typing/typing';
import { IsDecimal, IsOptional, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  imageUrl: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  stars?: string;

  @IsDecimal()
  price: Decimal;

  @IsString()
  description: string;
}
