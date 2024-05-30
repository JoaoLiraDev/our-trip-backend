import { DecimalColumn } from '@core/database/column';
import { BaseEntitySchema } from '@core/entity/base-entity';
import { Decimal } from '@core/typing/typing';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity extends BaseEntitySchema {
  @Column()
  imageUrl: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  stars?: string;

  @DecimalColumn({ precision: 13, scale: 3 })
  price: Decimal;

  @Column()
  description: string;
}
