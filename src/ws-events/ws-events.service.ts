import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Message } from './ws-events.types';

@Injectable()
export class WsEventsService {
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
}
