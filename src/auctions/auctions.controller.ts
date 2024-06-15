import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UsePipes } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto, CreateAuctionSchema } from './auction.shema';
import { Auction } from '@prisma/client';
import { error } from 'console';
import { ZodValidationPipe } from 'src/common/pipe/validation.pipe';
import { CreateBidDto, CreateBidSchema } from 'src/bids/bid.schema';

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
    @UsePipes(new ZodValidationPipe(CreateAuctionSchema))
    async create(@Body() data: CreateAuctionDto){  
        if(data){
            return this.auctionsService.create(data)
        }
    }

    @Post(':id/bid')
    @UsePipes(new ZodValidationPipe(CreateBidSchema) )
    async placeBid(
        @Body() data: CreateBidDto){
           
            // const data = CreateBidSchema.parse(body);

            // if(!data){  
            //     console.error("what is data");
            //     return 
            // }

            if(data){
                console.log("con data", data)
                return this.auctionsService.placeBid(data)
            }
    }
}
