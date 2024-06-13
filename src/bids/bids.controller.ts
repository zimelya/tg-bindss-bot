import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BidsService } from './bids.service';

@Controller('bids')
export class BidsController {
    constructor(private readonly bidsService: BidsService){ }

    @Get()
    async findAll() {
      return this.bidsService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number){
      return await this.bidsService.findOne(id);
    }
}
