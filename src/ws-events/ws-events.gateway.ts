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
import { GetBidsSchema, GetBidsShema } from 'src/bids/bid.schema';
import { ZodParsedType } from 'zod';
import { ZodValidationPipe } from 'src/common/pipe/validation.pipe';

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

  @SubscribeMessage('bid')
  handleBid(
    @MessageBody() bidData: GetBidsShema,
    @ConnectedSocket() client: Socket,
  ):void {
    console.log('Recived bids from', client.id, bidData);
    // this.eventService.broadcastBidsList({ auctionId: 1});
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
