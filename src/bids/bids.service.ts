import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBidDto, GetBidsDto, GetBidsSchema } from './bid.schema';
import { Bid } from '@prisma/client';

@Injectable()
export class BidsService {

    constructor(private prisma: PrismaService) {}

    findAll() {
        return this.prisma.bid.findMany()
    }

    findOne(id: number) {
        return this.prisma.bid.findUnique({
            where: { id }
        })
    }

    getBids(data: GetBidsDto) {
        const query: any = {
            where: {
                ...(data.userId && { userId: data.userId }),
                ...(data.auctionId && { auctionId: data.auctionId }),

            },
            orderBy: { timestamp: 'desc' },
        };

        if (data.count) {
            query.take = data.count;
        }

        return this.prisma.bid.findMany(query)
    }

    // create(data: CreateBidDto){
    //     // console.log("createBid data", data);
    //     return  this.prisma.bid.create({data})
    // }

    async create(data: CreateBidDto) {
        try {
          const newBid = await this.prisma.bid.create({ data: {
            auctionId: data.auctionId ,
            userId: data.userId,
            amount: data.amount
          } });
          return newBid;
        } catch (error) {
          throw new Error('Failed to create bid');
        }
      }
    


}
