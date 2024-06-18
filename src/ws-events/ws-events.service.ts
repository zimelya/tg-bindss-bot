import { Injectable, Module } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Message } from './ws-events.types';

import { BidsService } from '../bids/bids.service'
import { GetBidsShema } from 'src/bids/bid.schema';

@Module({
  imports: [BidsService]
})
@Injectable()
export class WsEventsService {
  [x: string]: any;

  // constructor(private readonly bidsService: BidsService) {}
  
  #clients: Socket[] = [];

  addClient(client: Socket): void {
    console.log('addClient', client.id);
    this.#clients.push(client);
    console.log(this.#clients.length);
  }
  removeClient(id: string) {
    console.log('removeClient');
    this.#clients = this.#clients.filter((client) => client.id !== id);
    console.log(this.#clients.length);
  }
  getClientId(id: string): Socket {
    return this.#clients.find((client) => client.id === id);
  }

  broadcastMessage(message: Message) {
    this.#clients.forEach((client) => {
      client.emit('message', message);
    });
  }
  broadcastBidsList(data: GetBidsShema) {
    const bids = this.bidsService.getBids(data);
    this.#clients.forEach((client) => {
      client.emit('bidsList', bids)
    });
  }


}
