import { Module } from "@nestjs/common";
import { TrpcService } from "./trpc.service";
import { TrpcRouter } from "./trpc.router";
import { UsersService } from "src/users/users.service";
import { PrismaService } from "src/prisma.service";



@Module({
    imports: [],
    controllers: [],
    providers: [TrpcService, TrpcRouter, UsersService, PrismaService],
})
export class TrpcModule { }
