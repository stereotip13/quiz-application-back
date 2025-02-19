import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const PORT = configService.get('port');
    // app.enableCors({
    //   origin: 'https://localhost:5173', // Указывает, с какого origin разрешены запросы
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    //   allowedHeaders: 'Content-Type, Authorization',
    // });
    app.enableCors({
      origin: (origin, callback) => {
        // Разрешаем запросы без Origin (например, cURL или Postman)
        if (!origin) {
          return callback(null, true);
        }

        // Проверяем, начинается ли origin с http://192.168.1.
        // Или разрешаем localhost:5173 (при необходимости)
        const isLocalNetwork = /^http:\/\/192\.168\.1\.\d{1,3}(:\d+)?$/.test(
          origin,
        );
        const isLocalhost5173 = origin === 'http://localhost:5173';

        if (isLocalNetwork || isLocalhost5173) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
    });
    app.useGlobalPipes(new ValidationPipe()); //у экземпляра приложения делаем валидацию и добавляем DTO
    const config = new DocumentBuilder()
      .setTitle('QUIZ API')
      .setDescription('The API description')
      .setVersion('1.0')
      .addTag('API')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); //запуск сваггера с параметрами, первая это путь
    await app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}
bootstrap();
