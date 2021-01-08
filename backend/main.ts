import helmet from 'helmet';
import csurf from 'csurf';
import * as compression from 'compression';

import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { TimeoutInterceptor } from './shared/interceptors/timeout.interceptor';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';
import { TypeORMExceptionFilter } from './shared/filters/typeorm-exception.filter';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalFilters(new HttpExceptionFilter(), new TypeORMExceptionFilter());
  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new TransformInterceptor(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const appName = configService.get('appName');
  const version = configService.get('version');
  const port = configService.get('port');
  const mode = configService.get('env');

  app.setGlobalPrefix(version);

  const options = new DocumentBuilder()
    .setTitle(appName)
    .setDescription('Ieszone application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  if (mode === 'production') {
    app.use(compression());
    app.use(helmet());
    app.use(csurf());
    app.enableCors();
  }
  await app.listen(port, () => {
    logger.log(`${appName} is running in ${mode.toUpperCase()} mode`);
    logger.log(`${appName} is running on http://localhost:${port}/${version}`);
  });
}
bootstrap();
