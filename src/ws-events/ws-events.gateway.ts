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
import { CreateBidDto, CreateBidSchema, GetBidsSchema, GetBidsDto, BidSchema } from 'src/bids/bid.schema';
import { ZodParsedType } from 'zod';
import { ZodValidationPipe } from 'src/common/pipe/validation.pipe';
import { PipesContextCreator } from '@nestjs/core/pipes';
import { UsePipes } from '@nestjs/common';

@WebSocketGateway({
  namespace: 'offers',
  cors: {
    origin: '*',
  },
})
export class WsEventsGateway {
  constructor(private eventService: WsEventsService) { }

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
  async handleBid(
    @MessageBody() bidData: any,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {

      const parsedData = CreateBidSchema.parse(bidData);

      if (!parsedData) {
        console.error("Empty ");
      }
      const dataCreate = {
        userId: parsedData.userId,
        auctionId: parsedData.auctionId,
        amount: parsedData.amount
      }

      await this.eventService.createBid(dataCreate);
      await this.eventService.broadcastBidsList(parsedData);

      console.log('Received bids from', client.id, parsedData);

    } catch (e) {
      console.error("Get bid data error", e);
    }
  }

  @SubscribeMessage('bidUp')
  async handleBidUp(
    @MessageBody() bidData: CreateBidDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      console.log("in bidData ", bidData)
      // const parsedData = CreateBidSchema.parse(bidData)

      await this.eventService.createBid(bidData);
      client.emit('bidUpSuccess', {})



      // if (parsedData.amount && parsedData.auctionId && parsedData.userId) {
      //   const existData = {
      //     amount: parsedData.amount,
      //     auctionId: parsedData.auctionId,
      //     userId: parsedData.userId
      //   }
      //   await this.eventService.createBid(existData);
      //   client.emit('bidUpSuccess', {})
      // }


    } catch (e) {
      client.emit("error", { message: "some error", e })
      console.error("handleBidUp error")
    }

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
