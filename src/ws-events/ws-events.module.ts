import { Module } from '@nestjs/common';
import { WsEventsGateway } from './ws-events.gateway';
import { WsEventsService } from './ws-events.service';

@Module({
  providers: [WsEventsService, WsEventsGateway],
})
export class WsEventsModule {
  providers: [WsEventsGateway];
  exports: [WsEventsGateway];
}
