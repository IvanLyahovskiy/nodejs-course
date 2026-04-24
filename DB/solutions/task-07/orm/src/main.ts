import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  console.log('=== DEBUG ENV VARIABLES ===');
  console.log('Current directory:', process.cwd());
  console.log('POSTGRES_HOST:', process.env.POSTGRES_HOST);
  console.log('POSTGRES_PORT:', process.env.POSTGRES_PORT);
  console.log('POSTGRES_USERNAME:', process.env.POSTGRES_USERNAME);
  console.log('POSTGRES_DB:', process.env.POSTGRES_DB);
  console.log('==========================');
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
