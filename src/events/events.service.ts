import { Injectable } from '@nestjs/common';
import { Bids, Events } from '@prisma/client';
import { EventStatus } from 'src/common-types';
import { PrismaService } from 'src/prisma.service';
import { CreateEventDto } from './event.dto';

@Injectable()
export class EventsService {
  
  constructor(private  prisma: PrismaService) {}

  findAll(): Promise<Events[]> {
    return this.prisma.events.findMany();
  }

  findOne(id: number): Promise<Events | null> {
    return this.prisma.events.findUnique({
      where: { id },
    });
  }

  create(data: CreateEventDto): Promise<Events> {
    return this.prisma.events.create({ data });
  }

  update(id: number, data: CreateEventDto){
    return this.prisma.events.update({
      where: {id},
      data: { data },
    });
  }

  updateStatus(id: number, status: EventStatus) {
    return this.prisma.events.update({
      where: { id },
      data: { status },
    });
  }

 
  addBid(id: number, bid: { id: number; amount: number; userId: number; eventId: number; timestamp: Date; }) {
    return this.prisma.events.update({
      where: {id},
      data: {bid}
    })
  }
}
