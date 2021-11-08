import {
  BaseEntity,
  BeforeUpdate,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../../base/role';
import { Exclude, Expose } from 'class-transformer';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Exclude({ toPlainOnly: true })
  id: number;

  @Expose({ groups: [Role.Admin, Role.User] })
  @Column({ default: 'Khoa' })
  firstName: string;

  @Expose({ groups: [Role.Admin, Role.User] })
  @Column({ default: 'Le' })
  lastName: string;

  @Expose({ groups: [Role.Admin, Role.User] })
  @Column()
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  // @Exclude()
  password: string;

  @Column({ default: true })
  @Exclude({ toPlainOnly: true })
  isActive: boolean;

  @Expose({ groups: [Role.Admin] })
  //@Expose()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  @Expose()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  @Expose()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;

  // async validatePassword(password: string): Promise<boolean> {
  //   const hash = await bcrypt.hash(password, this.salt);
  //   return hash === this.password;
  // }

  // @BeforeInsert()
  // @BeforeUpdate()
  // async hashPassword(): Promise<void> {
  //   //const salt = await bcrypt.genSalt();
  //   this.password = await bcrypt.hash(this.password, 10); // tự động tạo muối rồi mã hóa (ASYNC)
  // }

  // async comparePassword(myPlaintextPassword: string): Promise<boolean> {
  //   return await bcrypt.compare(myPlaintextPassword, this.password);
  // }

  // async comparePassword(plaintextPassword: string) {
  //   return await bcrypt.compare(plaintextPassword, this.password);
  // }
}
