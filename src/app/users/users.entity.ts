import { BaseEntitySchema } from '@core/entity/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity extends BaseEntitySchema {
  @Column({})
  nome: string;
}
