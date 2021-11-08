import { Exclude, Expose } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  price: number;

  @Column()
  @Exclude({ toPlainOnly: true })
  cost: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;
}
