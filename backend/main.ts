import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';

async function bootstrap() {
  const { appName, port, version } = config;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(version);
  await app.listen(port, () => {
    console.info(
      `${appName} is running on http://localhost:${port}/${version}`,
    );
  });
}
bootstrap();
