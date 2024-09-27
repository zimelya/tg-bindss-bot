import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import { TrpcRouter } from './trpc/trpc.router';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    credentials: true,
    origin: '*'
  }))
  const trpc = app.get(TrpcRouter)
  trpc.applyMiddleware(app)
  await app.listen(process.env.PORT || 3000);
}
bootstrap()
