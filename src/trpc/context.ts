import { JwtService } from '@nestjs/jwt';
// import * as trpcNext from '@trpc/server/adapters/next';
import * as trpcExpress from '@trpc/server/adapters/express';


const jwtService = new JwtService


async function getUserFromHeader(req: trpcExpress.CreateExpressContextOptions['req']) {
    if (req.headers.authorization) {
        // jwtService.decode(req.headers.authorization.split(' ')[1],)

        try {
            const user = await jwtService.decode(
                req.headers.authorization.split(' ')[1],
            );
            console.log("get user use servise jwt")
        } catch (e) {
            console.log("error decode token")
        }


        return { user: { id: 1, name: "Jone Doe" } }
    }
    return null;
}


export async function createContext({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) {
    // Create your context based on the request object
    // Will be available as `ctx` in all your resolvers
    // This is just an example of something you might want to do in your ctx fn

    const user = await getUserFromHeader(req);
    return {
        user,
    };
}
export type Context = Awaited<ReturnType<typeof createContext>>;

// private extractTokenFromHeader(request: Request): string | undefined {
//     const authHeader = request.headers.get('authorization');
//     const [type, token] = authHeader?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
// }