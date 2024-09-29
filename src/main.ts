import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express'
import { TrpcRouter } from './trpc/trpc.router';
import { createContext } from './trpc/trpc.context';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const trpc = app.get(TrpcRouter)
  app.use(cors({
    credentials: true,
    origin: '*'
  }))
  app.use('/trpc',
    trpcExpress.createExpressMiddleware({
      router: trpc.trpcRouter,
      createContext,
    })
  )
  // const trpc = app.get(TrpcRouter)
  // trpc.applyMiddleware(app)
  await app.listen(process.env.PORT || 3000);
}
bootstrap()
