import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ignoring incorrect parameters
      forbidNonWhitelisted: true // throw error for incorrect parameters
    })
  )
  await app.listen(3000)
}
bootstrap()
