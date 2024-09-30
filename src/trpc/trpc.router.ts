import { INestApplication, Injectable } from "@nestjs/common";
import { TrpcService } from "./trpc.service";
import { z } from "zod";
import * as trpcExpress from "@trpc/server/adapters/express"
import { AuthService } from "src/auth/auth.service";
import { testRouter, TestRouterType } from "./test.router";
import { createContext } from "./context";
import { authRouter, AuthRouter } from "./auth.router";


@Injectable()
export class TrpcRouter {

    constructor(
        private readonly trpc: TrpcService,
        private readonly auth: AuthService,

    ) { }

    appRouter = this.trpc.router({

        test: testRouter.router,

        // signIn: this.trpc.procedure
        //     .input(z.object({ phone: z.string(), pass: z.string() }))
        //     .query(async ({ input }) => {
        //         const { phone, pass } = input
        //         return await this.auth.signIn({ phone, pass })
        //     }),

        auth: authRouter.router,
    })


    async applyMiddleware(app: INestApplication) {
        app.use('/trpc',
            trpcExpress.createExpressMiddleware({
                router: this.appRouter,
                createContext: createContext
            })
        )
    }

}

export type AppRouter = TrpcRouter['appRouter']


export type RouterTypes = AppRouter & TestRouterType