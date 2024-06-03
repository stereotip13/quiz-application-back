import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Role } from '../roles/models/roles.model';
import { UserRoles } from '../roles/models/user-roles.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Role, UserRoles])], //для работы с запросами к БД, forFeature -значит вся логика используется в рамках текущего модуля
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
