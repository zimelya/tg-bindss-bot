import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UsePipes } from '@nestjs/common';
import { EventsService } from './events.service';
import { ZodValidationPipe } from 'src/common/pipe/validation.pipe';
import { CreateEventDto, CreateEventSchema } from './event.dto';
import { EventStatus } from 'src/common-types';
import { Bids } from '@prisma/client';

@Controller('events')
export class EventsController {
  constructor(readonly eventsService: EventsService) {}

  @Get()
  async findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number){
    return await this.eventsService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateEventSchema)) 
  async createEvent(@Body() createEventDto: CreateEventDto){
    console.log(createEventDto );
    return await  this.eventsService.create(createEventDto);
  }

  @Put(':id')
  async updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(CreateEventSchema)) createEventDto: CreateEventDto,
  ){
    return await this.eventsService.update(id, createEventDto)
  }

  @Put(':id')
  async updateEventStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(CreateEventSchema)) status: EventStatus,
  ){
    return await this.eventsService.updateStatus(id, status)
  }

  @Post(':id')
  async updateEventBid(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(CreateEventSchema)) bid: Bids
  ){
    return await this.eventsService.addBid(id, bid)
  }
}
