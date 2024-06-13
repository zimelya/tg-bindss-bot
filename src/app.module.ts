import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { BidsController } from './bids/bids.controller';
import { BidsService } from './bids/bids.service';
import { BidsModule } from './bids/bids.module';

@Module({
  imports: [UsersModule, EventsModule, BidsModule],
  controllers: [AppController, BidsController],
  providers: [AppService, BidsService],
})
export class AppModule {}
