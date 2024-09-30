import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express'
import { TrpcRouter } from './trpc/trpc.router';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const trpc = app.get(TrpcRouter)
  app.use(cors({
    credentials: true,
    origin: '*'
  }))
  // app.use('/trpc',
  //   trpcExpress.createExpressMiddleware({
  //     router: trpcRouter,
  //     createContext,
  //   })
  // )
  // const trpc = app.get(TrpcRouter)
  trpc.applyMiddleware(app)
  await app.listen(process.env.PORT || 3000);
}
bootstrap()
