import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UsePipes } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto, CreateAuctionSchema } from './auction.shema';
import { ZodValidationPipe } from 'src/common/pipe/validation.pipe';
import { CreateBidDto, CreateBidSchema } from 'src/bids/bid.schema';

@Controller('auctions')
export class AuctionsController {

    constructor(private readonly auctionsService: AuctionsService) {}

    @Get()
    async findAll(){
        return this.auctionsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number){
        console.log("id", id);
        return this.auctionsService.findOne(id)
    }

    @Post('create')
    // @UsePipes(new ZodValidationPipe(CreateAuctionSchema))
    async create(@Body() data: CreateAuctionDto){  
        console.log(data)
        if(data){
            return this.auctionsService.create(data)
        }
    }

    @Post(':id/bid')
    @UsePipes(new ZodValidationPipe(CreateBidSchema) )
    async placeBid(
        @Body() data: CreateBidDto){

            if(data){
                
                return this.auctionsService.placeBid(data)
            }
    }
}
