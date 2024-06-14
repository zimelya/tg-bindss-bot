import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { CreateAuctionSchema } from './auction.shema';
import { Auction } from '@prisma/client';

@Controller('auctions')
export class AuctionsController {

    constructor(private readonly auctionsService: AuctionsService) {}

    @Get()
    async findAll(){
        return this.auctionsService.findAll();
    }

    @Get('id')
    async findOne(@Param('id', ParseIntPipe) id: number){
        return this.auctionsService.findOne(id)
    }

    @Post()
    async create(@Body() body: unknown): Promise<Auction>{
        const data = CreateAuctionSchema.parse(body)
        if(data){
            return this.auctionsService.create(data)
        }
        
    }
}
