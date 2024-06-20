import { Module } from '@nestjs/common';
import { WsEventsGateway } from './ws-events.gateway';
import { WsEventsService } from './ws-events.service';
import { BidsService } from 'src/bids/bids.service';
import { BidsModule } from 'src/bids/bids.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [BidsModule],
  providers: [WsEventsService, WsEventsGateway, BidsService, PrismaService],
})
export class WsEventsModule {
  providers: [WsEventsGateway];
  exports: [WsEventsGateway];
}
