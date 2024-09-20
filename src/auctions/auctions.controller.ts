import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UsePipes } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto, CreateAuctionSchema } from './auction.shema';
import { ZodValidationPipe } from 'src/common/pipe/validation.pipe';
import { CreateBidDto, CreateBidSchema } from 'src/bids/bid.schema';
import { ImageType } from '@prisma/client';

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
        if(data){
            return this.auctionsService.create(data)
        }
    }

    
    // id: number, { imageType, images, primary }: {
    //     imageType: $Enums.ImageType;
    //     images: string[];
    //     primary: string;
    // }
    @Post('updateimg')
    async updateImg(@Body() data: { id: number, imageType: ImageType, images: string[], primary: string}){
        if(data){
            return this.auctionsService.updateImages(data)
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
