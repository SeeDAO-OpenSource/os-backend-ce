## API文档

1. 安装依赖

```bash
npm install --save @nestjs/swagger swagger-ui-express
```

2. 在`main.ts`中添加swagger配置

```typescript
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('My API description')
    .setVersion('1.0')
    .addTag('my-tag')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

3. 为你的 API 方法添加 Swagger 装饰器。在控制器和方法中添加适当的装饰器，以提供有关 API 的元数据。例如：
    
    ```typescript
    import { Controller, Get } from '@nestjs/common';
    import { ApiTags, ApiResponse } from '@nestjs/swagger';

    @ApiTags('my-tag')
    @Controller()
    export class AppController {
    @Get()
    @ApiResponse({
        status: 200,
        description: 'The found record',
    })
    getHello(): string {
        return 'Hello World!';
    }
    }
    ```
4. 使用`npm run start`在浏览器中打开 http://localhost:3000/api，你将看到自动生成的 API 文档。    


