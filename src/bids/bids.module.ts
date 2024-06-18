import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { PrismaService } from 'src/prisma.service';
import { BidsController } from './bids.controller';

@Module({
    providers: [BidsService, PrismaService],
    controllers: [BidsController]
})
export class BidsModule {}
