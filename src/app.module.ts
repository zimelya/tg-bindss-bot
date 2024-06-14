import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { WsEventsModule } from './ws-events/ws-events.module';

@Module({
  imports: [UsersModule, EventsModule, WsEventsModule],
  controllers: [AppController],
  providers: [AppService, WsEventsModule],
})
export class AppModule {}
