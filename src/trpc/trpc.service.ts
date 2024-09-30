import { Injectable } from "@nestjs/common";
import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";


@Injectable()
export class TrpcService {
    trpc = initTRPC.context<Context>().create()
    procedure = this.trpc.procedure;
    router = this.trpc.router;
    mergeRouter = this.trpc.mergeRouters;

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

    protected = this.trpc.procedure.use(this.isAuthed)
}


// const isAuthed = async (opts) => {
//     const { ctx } = opts
//     if (!ctx.user) {
//         throw new TRPCError({ code: 'UNAUTHORIZED' })
//     }

//     return opts.next({
//         ctx: {
//             user: ctx.user
//         }
//     })
// }