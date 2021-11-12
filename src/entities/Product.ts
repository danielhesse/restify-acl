import { Column, Entity } from 'typeorm';

import { BaseEntity } from './BaseEntity';

@Entity('products')
class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;
}

export { Product };
