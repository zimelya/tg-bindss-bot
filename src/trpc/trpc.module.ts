import { forwardRef, Module } from "@nestjs/common";
import { TrpcService } from "./trpc.service";
import { TrpcRouter } from "./trpc.router";
import { UsersService } from "src/users/users.service";
import { PrismaService } from "src/prisma.service";
import { AuthRouter } from "../auth/auth.router";
import { AuthModule } from "src/auth/auth.module";



@Module({
    imports: [forwardRef(() => AuthModule)],
    controllers: [],
    providers: [
        TrpcService,
        TrpcRouter,
        UsersService,
        PrismaService,
        AuthRouter],
    exports: [TrpcRouter]
})
export class TrpcModule { }
