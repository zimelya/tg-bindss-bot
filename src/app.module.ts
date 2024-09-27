import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WsEventsModule } from './ws-events/ws-events.module';
import { AuctionsModule } from './auctions/auctions.module';
import { BidsModule } from './bids/bids.module';
import { AuthModule } from './auth/auth.module';
import { TrpcModule } from './trpc/trpc.module';


@Module({
  imports: [
    UsersModule,
    AuctionsModule,
    BidsModule,
    WsEventsModule,
    AuthModule,
    TrpcModule,
  ],
  controllers: [AppController],
  providers: [AppService, WsEventsModule],
})
export class AppModule { }
