import { BaseEntitySchema } from '@core/entity/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity extends BaseEntitySchema {
  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;
}
