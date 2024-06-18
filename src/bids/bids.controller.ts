import { Body, Controller, Get, UsePipes } from '@nestjs/common';
import { BidsService } from './bids.service';
import { ZodValidationPipe } from 'src/common/pipe/validation.pipe';
import { GetBidsSchema, GetBidsShema } from './bid.schema';

@Controller('bids')
export class BidsController {
    constructor(private readonly bidsService: BidsService) {}

    @Get()
    @UsePipes(new ZodValidationPipe(GetBidsSchema))
    async getBids(@Body() data: GetBidsShema){
        if(data){
            return await this.bidsService.getBids(data);
        }
    }


    // @Get('getFew')
    // @UsePipes(new ZodValidationPipe(GetBidsSchema))
    // async getLastFewBids(@Body() data: GetBidsShema){
    //     if(data){
    //         return await this.bidsService.getLastFewBids(data);
    //     }
    // }

}
