import { Inject, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TrpcService } from "src/trpc/trpc.service";
import { types } from "util";
import { User } from "@prisma/client";
import { GetUserDto, UserSchema } from "./users.dto";


export type UsersContext = User


@Injectable()
export class UserRouter {
    constructor(
        private readonly trpc: TrpcService,
        private readonly userService: UsersService,
    ) { }

    usersRouter = this.trpc.router({

        getUser: this.trpc.procedure.input(UserSchema)
            .query(async ({ input }) => await this.userService.findByPhone(input.phone))

    })
}