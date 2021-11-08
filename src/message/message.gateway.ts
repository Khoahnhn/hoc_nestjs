import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  wss: Server;

  private logger: Logger = new Logger('MessageGateway');

  afterInit(server: Server): any {
    this.logger.log('MessageGateway Initialized');
  }

  handleConnection(client: Socket, ...args: any[]): any {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): any {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    // this.wss.emit('message', { message });
    // return { event: 'message', data: text };
    this.wss.emit('message', payload, client.id);
  }
}
