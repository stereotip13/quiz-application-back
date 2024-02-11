import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configurations from './configurations';

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
        models: [],
      }),
    }),
    UserModule,
  ],
})
export class AppModule {}
