import { Module } from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { PrismaService } from 'src/prisma.service';
import { AuctionsController } from './auctions.controller';

@Module({
  imports: [],
  controllers: [AuctionsController],
  providers: [AuctionsService, PrismaService],
})
export class AuctionsModule {}
