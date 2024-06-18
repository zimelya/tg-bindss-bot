import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBidDto, GetBidsShema } from './bid.schema';

@Injectable()
export class BidsService {

    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.bid.findMany()
    }

    findOne(id: number) {
        return this.prisma.bid.findUnique({
            where: { id }
        })
    }

    getBids(data: GetBidsShema) {
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

    create(data: CreateBidDto) {
        return this.prisma.bid.create({ data })
    }

}
