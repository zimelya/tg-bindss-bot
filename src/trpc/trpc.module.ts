import { Module } from "@nestjs/common";
import { TrpcService } from "./trpc.service";
import { TrpcRouter } from "./trpc.router";
import { AuthModule } from "src/auth/auth.module";


@Module({
    imports: [AuthModule],
    controllers: [],
    providers: [TrpcService, TrpcRouter],
})
export class TrpcModule { }