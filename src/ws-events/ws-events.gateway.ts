import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ClientToServerListen, ServerToClientListen } from './ws-events.types';
import { WsEventsService } from './ws-events.service';

@WebSocketGateway({
  namespace: 'offers',
  cors: {
    origin: '*',
  },
})
export class WsEventsGateway {
  constructor(private eventService: WsEventsService) {}

  @WebSocketServer() server: Server<ClientToServerListen, ServerToClientListen>;
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() message: any,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log('Received message from ', client.id, message);
    this.eventService.broadcastMessage({ sender: client.id, body: message });
  }
  handleConnection(@ConnectedSocket() client: Socket) {
    if (!this.eventService.getClientId(client.id))
      this.eventService.addClient(client);
  }
  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.eventService.removeClient(client.id);
    client.disconnect(true);
  }
}
