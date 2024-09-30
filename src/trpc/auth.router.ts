import { Injectable } from "@nestjs/common";
import { TrpcService } from "./trpc.service";
import { AuthService } from "src/auth/auth.service";
import { UserSchema } from "src/users/users.dto";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import passport from "passport";
import { z } from "zod";


@Injectable()
export class AuthRouter {

    constructor(
        private readonly trpc: TrpcService,
        private readonly auth: AuthService,
    ) { }


    router = this.trpc.router({

        signIn: this.trpc.procedure
            .input(z.object({
                phone: z.string(),
                password: z.string()
            }))
            .query(async ({ input }) => {
                const { phone, password } = input

                const token = await this.auth.signIn({ phone, pass: password })
                console.log("ther must be token", token)
                return {
                    tokenObj: token
                }
            }),

        someTest: this.trpc.procedure
            .input(z.object({ someText: z.string(), someNumber: z.number() }))
            .query(({ input }) => {
                const { someText, someNumber } = input

                return {
                    therOutObj: {
                        text: someText ? someText : "Oh no text",
                        number: someNumber ? someNumber : 0,
                    }
                }
            }),
    })

}

export const authRouter = new AuthRouter(
    new TrpcService(),
    new AuthService(
        new UsersService(new PrismaService),
        new JwtService()))