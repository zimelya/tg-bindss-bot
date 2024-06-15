import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WsEventsModule } from './ws-events/ws-events.module';
import { BidsModule } from './bids/bids.module';
import { AuctionsModule } from './auctions/auctions.module';

@Module({
  imports: [UsersModule, WsEventsModule, BidsModule, AuctionsModule],
  controllers: [AppController],
  providers: [AppService, WsEventsModule],
})
export class AppModule {}
