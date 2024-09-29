import { Injectable } from "@nestjs/common";
import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./trpc.context";



@Injectable()
export class TrpcService {
    trpc = initTRPC.context<Context>().create();
    procedure = this.trpc.procedure;
    router = this.trpc.router;
    mergeRouters = this.trpc.mergeRouters;

    isAuthed = this.trpc.middleware(({ ctx, next }) => {
        if (!ctx.user) {
            throw new TRPCError({ code: 'UNAUTHORIZED' })
        }

        return next({
            ctx: {
                user: ctx.user
            }
        })
    })

    protectedProcdure = this.trpc.procedure.use(this.isAuthed)


}
