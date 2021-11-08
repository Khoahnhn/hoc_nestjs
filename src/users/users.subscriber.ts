import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { InjectConnection } from '@nestjs/typeorm';

// @Injectable()
@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
  private readonly bcryptSalt: number;

  constructor(connection: Connection) {
    // connection.subscribers.push(this);
    this.bcryptSalt = 10;
  }
  // constructor(@InjectConnection() readonly connection: Connection) {
  //   // connection.subscribers.push(this);
  //   this.bcryptSalt = 10;
  // }

  // eslint-disable-next-line @typescript-eslint/ban-types
  listenTo(): Function | string {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>): Promise<void> {
    const { password } = event.entity;
    event.entity.password = await bcrypt.hash(password, this.bcryptSalt);
  }
}
