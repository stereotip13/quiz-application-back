import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtStrategy } from 'src/strategy';

@Module({
  imports: [SequelizeModule.forFeature([User])], //для работы с запросами к БД, forFeature -значит вся логика используется в рамках текущего модуля
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
