import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { Questions } from './models/questions.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Questions])],//для работы с запросами к БД, forFeature -значит вся логика используется в рамках текущего модуля
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
