import { INestApplication, Injectable } from "@nestjs/common";
import { TrpcService } from "./trpc.service";
import { z } from "zod";
import * as trpcExpress from "@trpc/server/adapters/express"
import { AuthService } from "src/auth/auth.service";
import { query } from "express";
import { UserSchema } from "src/users/users.dto";
import { UsersService } from "src/users/users.service";
import { PrismaService } from "src/prisma.service";


@Injectable()
export class TestRouter {

    constructor(
        private readonly trpc: TrpcService,
        private readonly userService: UsersService,


    ) { }

    router = this.trpc.router({
        hello: this.trpc.procedure
            .input(
                z.object({
                    name: z.string().optional()
                })
            )
            .query(({ input }) => {
                const { name } = input
                return {
                    greeting: `Hello ${name ? name : 'Bolbo'}`
                }
            }),



        secret: this.trpc.protected
            .input(z.object({ id: z.number() }))
            .query(({ input }) => {
                const { id } = input
                return {
                    secretData: `Ther is your id ${id}`
                }
            }),

        getUser: this.trpc.procedure
            .input(UserSchema)
            .mutation(async ({ input }) => {
                const { phone } = input

                const user = await this.userService.findByPhone(phone)

                return { user }
            })
    })

}

export const testRouter = new TestRouter(new TrpcService(), new UsersService(new PrismaService))

export type TestRouterType = TestRouter['router']