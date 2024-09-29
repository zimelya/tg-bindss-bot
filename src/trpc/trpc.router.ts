import { INestApplication, Injectable } from "@nestjs/common";
import { TrpcService } from "./trpc.service";
import { z } from "zod";
import * as trpcExpress from '@trpc/server/adapters/express';
import { UsersService } from "src/users/users.service";
import { CreateUserDto, GetUserDto, UserSchema } from "src/users/users.dto";
import { authRouter, AuthRouter } from "../auth/auth.router";
import { mergeRouters } from "@trpc/server/dist/unstable-core-do-not-import";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";



@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    // private readonly authRouter: AuthRouter,
  ) { }

  // trpcRouter = this.trpc.router({
  //   hello: this.trpc.procedure
  //     .input(z.object({ name: z.string() }))
  //     .query(({ input }) => `Hello ${input.name}`),

  //   secretData: this.trpc.protectedProcdure.query(() => {
  //     return "This is protected data"
  //   }),

  // });
  trpcRouter = this.trpc.mergeRouters(
    this.trpc.router({
      hello: this.trpc.procedure
        .input(z.object({ name: z.string() }))
        .query(({ input }) => `Hello ${input.name}`),

      auth: authRouter.authRouter.hoba
      // auth: this.authRouter.authRouter,
    }),
    // this.authRouter.authRouter

  )





  // async applyMiddleware(app: INestApplication) {
  //   app.use('/trpc', trpcExpress.createExpressMiddleware({ router: this.trpcRouter }))
  // }
}

export type TrpcRouterType = TrpcRouter[`trpcRouter`];
// export const trpcRouter = TrpcRouter(TrpcService, AuthService)
// export const trpcRouter = new TrpcRouter(
//   new TrpcService(),
//   new AuthRouter(new TrpcService)


// ).trpcRouter;

