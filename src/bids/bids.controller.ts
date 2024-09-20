import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { BidsService } from './bids.service';
import { ZodValidationPipe } from 'src/common/pipe/validation.pipe';
import { GetBidsSchema, GetBidsDto, CreateBidDto, CreateBidSchema } from './bid.schema';

@Controller('bids')
export class BidsController {
    constructor(private readonly bidsService: BidsService) {}

    @Post('getFew')
    @UsePipes(new ZodValidationPipe(GetBidsSchema))
    async getBids(@Body() data: GetBidsDto){
        if(data){
            return await this.bidsService.getBids(data);
        }
    }

    @Get('getFew')
    @UsePipes(new ZodValidationPipe(GetBidsSchema))
    async getLastFewBids(@Body() data: GetBidsDto){
        if(data){
            return await this.bidsService.getBids(data);
        }
    }

    @Post('add')
    @UsePipes(new ZodValidationPipe(CreateBidSchema))
    async createBid(@Body() data: CreateBidDto){
        if(data){
            return await this.bidsService.create(data);
        }
    }

}
