import { Decimal } from './../../core/typing/typing';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CreateProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async listProducts(): Promise<ProductEntity[]> {
    return this.repository.find();
  }

  async getProduct(id: string): Promise<ProductEntity> {
    return this.repository.findOne({ where: { id } });
  }

  async createProduct(productDto: CreateProductDTO): Promise<ProductEntity> {
    const createdProduct = await this.repository.save({
      ...productDto,
      price: new Decimal(productDto.price),
    });
    return createdProduct;
  }
}
