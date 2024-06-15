import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBidDto } from './bid.schema';

@Injectable()
export class BidsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.bid.findMany();
  }

  findOne(id: number) {
    return (
      this,
      this.prisma.bid.findUnique({
        where: { id },
      })
    );
  }

  create(data: CreateBidDto) {
    return this.prisma.bid.create({ data });
  }
}
