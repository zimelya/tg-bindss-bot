import { INestApplication, Injectable } from "@nestjs/common";
import { TrpcService } from "./trpc.service";
import { z } from "zod";
import * as trpcExpress from '@trpc/server/adapters/express';
import { UsersService } from "src/users/users.service";
import { CreateUserDto, GetUserDto, UserSchema } from "src/users/users.dto";


@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly usersService: UsersService,
  ) { }

  trpcRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(z.object({ name: z.string() }))
      .query(({ input }) => `Hello ${input.name}`),

    getUsers: this.trpc.procedure
      .query(async () => await this.usersService.findAll()),

    getUser: this.trpc.procedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => await this.usersService.findOne(input.id)),

    createUser: this.trpc.procedure
      .input(UserSchema)
      .mutation(async ({ input }) => await this.usersService.create(input as CreateUserDto)),


  });


  async applyMiddleware(app: INestApplication) {
    app.use('/trpc', trpcExpress.createExpressMiddleware({ router: this.trpcRouter }))
  }
}

export type TrpcRouterType = TrpcRouter[`trpcRouter`];
