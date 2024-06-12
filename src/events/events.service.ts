import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EventStatus } from 'src/common-types';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.events.findMany();
  }

  findOne(id: number) {
    return this.prisma.events.findUnique({
      where: { id },
    });
  }

  create(data: Prisma.EventsCreateInput) {
    return this.prisma.events.create({
      data,
    });
  }

  updateStatus(id: number, status: EventStatus) {
    return this.prisma.events.update({
      where: { id },
      data: { status },
    });
  }
}
