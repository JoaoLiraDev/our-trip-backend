import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Response } from 'express';
import { CreateProductDTO } from './product.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Public } from '../auth/auth.decorator';

@Public()
@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async listProducts(@Res() response: Response) {
    return response.status(200).json(await this.productService.listProducts());
  }

  @Get(':id')
  async getProduct(@Res() response: Response, @Param('id') id: string) {
    return response.status(200).json(await this.productService.getProduct(id));
  }

  @Post()
  async createProduct(
    @Res() response: Response,
    @Body() dto: CreateProductDTO,
  ) {
    return response
      .status(201)
      .json(await this.productService.createProduct(dto));
  }
}
