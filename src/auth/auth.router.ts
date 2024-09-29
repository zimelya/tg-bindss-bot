import { Injectable, Options } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserSchema } from "src/users/users.dto";
import { TrpcService } from "src/trpc/trpc.service";
import passport from "passport";
import { z } from "zod";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { PrismaService } from "src/prisma.service";



@Injectable()
export class AuthRouter {
    constructor(
        private readonly trpc: TrpcService,
        private readonly authService: AuthService

    ) { }

    authRouter = this.trpc.router({

        hoba: this.trpc.procedure
            .input(z.object({ what: z.string() }))
            .query(({ input }) => `Hoba ${input.what}`)

        // login: this.trpc.procedure
        //     .input(z.object({
        //         phone: z.string(),
        //         password: z.string()
        //     }))
        //     .query(async ({ input }) => {

        //         return await this.authService.signIn({ phone: input.phone, pass: input.password })
        //         return { token: 'valid-token', userId: 1 }
        //     }

        //     ),

        // logout: this.trpc.protectedProcdure.mutation(() => {
        //     return { success: true }
        // })
    })
}

export const authRouter = new AuthRouter(new TrpcService, new AuthService(new UsersService(new PrismaService), new JwtService))