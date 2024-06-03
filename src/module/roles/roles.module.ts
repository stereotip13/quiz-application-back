import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models/roles.model';
import { User } from '../user/models/user.model';
import { UserRoles } from './models/user-roles.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  //обязательно импортируем модель БД + добавляем в app.module в список моделей
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
})
export class RolesModule {}
