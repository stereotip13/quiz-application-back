import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Result } from './models/results.model';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([Result]), UserModule],
  controllers: [ResultsController],
  providers: [ResultsService],
  exports: [ResultsService],
})
export class ResultsModule {}
