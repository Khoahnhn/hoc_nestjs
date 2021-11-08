import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';

@Module({
  providers: [MessageGateway],
  imports: [],
})
export class MessageModule {}
