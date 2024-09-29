import * as trpcExpress from '@trpc/server/adapters/express';


// Mock authentication function
const authenticateUser = (req: trpcExpress.CreateExpressContextOptions['req']) => {
    // In a real app, you'd check the authentication token here
    const authHeader = req.headers.authorization;
    console.log("trpc context authHeader", authHeader)
    if (authHeader === 'Bearer valid-token') {
        return { id: '1', name: 'John Doe' };
    }
    return null;
};



export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({
    user: authenticateUser(req)
});

export type Context = Awaited<ReturnType<typeof createContext>>;
