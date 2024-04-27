import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configurations from './configurations';
import { User } from './module/user/models/user.model';
import { AuthModule } from './module/auth/auth.module';
import { QuestionsModule } from './module/questions/questions.module';
import { Questions } from './module/questions/models/questions.model';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configurations] }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('dbHost'),
        port: configService.get('dbPort'),
        username: configService.get('dbUser'),
        password: configService.get('dbPassword'),
        database: configService.get('dbName'),
        synchronize: true,
        autoLoadModels: true,
        models: [User, Questions],
      }),
    }),
    UserModule,
    AuthModule,
    QuestionsModule
  ],
})
export class AppModule {}
