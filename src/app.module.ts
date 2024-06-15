import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';


@Module({
  imports: [UsersModule, EventsModule, WsEventsModule],
  controllers: [AppController],
  providers: [AppService, WsEventsModule],
})
export class AppModule {}
