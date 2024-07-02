import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAuctionDto } from './auction.shema';
import { CreateBidDto } from 'src/bids/bid.schema';
import { Auction, Bid } from '@prisma/client';

@Injectable()
export class AuctionsService {

    constructor(private prisma: PrismaService){}

    findAll() {
        return this.prisma.auction.findMany({ include: {bids: true}})
    }

    findOne(id: number):Promise<Auction | null>{
        return this.prisma.auction.findUnique({
            where: {id},
            include: { bids: true }
        })
    }

    create(data: CreateAuctionDto): Promise<Auction>{
        return this.prisma.auction.create({ 
            data: { 
                title: data.title,
                startPrice: data.startPrice,
                startTime: data.startTime,
                endTime: data.endTime,
                userId: data.userId 
            }})
    }

    async placeBid(data: CreateBidDto): Promise<Bid>{
        
        const bid = await this.prisma.bid.create({ data });

        await this.prisma.auction.update({
            where: { id: data.auctionId },
            data: { currentPrice: data.amount },
        })

        return bid;
    }

}
