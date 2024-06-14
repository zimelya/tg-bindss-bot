import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// import { EventsModule } from './events/events.module';
import { BidsController } from './bids/bids.controller';
import { BidsService } from './bids/bids.service';
// import { BidsController } from './bids/bids.controller';
import { AuctionsController } from './auctions/auctions.controller';
// import { BidsModule } from './bids/bids.module';
import { AuctionsService } from './auctions/auctions.service';
import { PrismaModule } from './prisma.module';
// import { BidsService } from './bids/bids.service';

@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [AppController, BidsController, AuctionsController],
  providers: [AppService, BidsService, AuctionsService],
})
export class AppModule {}
