import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth';
import { PermissionsGuard } from './permission';
import { RolesGuard } from './permission/role.guard';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '10mb' }));

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  app.useGlobalGuards(app.get(JwtAuthGuard));
  app.useGlobalGuards(app.get(PermissionsGuard))
  app.useGlobalGuards(app.get(RolesGuard))

  // 自定义 CORS 选项
  app.enableCors({
    origin: '*', // 允许任何来源
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的 HTTP 方法
    allowedHeaders: 'Content-Type, Accept', // 允许的请求头
    credentials: true, // 允许携带凭证（cookie 等）
  });

  // Serve static files
  // app.use('/public', express.static(join(__dirname, '..',  'public'))); 

  const config = new DocumentBuilder()
    .setTitle('SeeDao-OS-API')
    .setDescription('SeeDao-OS-API description')
    .setVersion('1.0')
    .addTag('tag')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();