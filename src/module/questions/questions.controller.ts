import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateQuestionDTO } from './dto';
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @ApiTags('questions create')
  @ApiResponse({ status: 201, type: CreateQuestionDTO })
  @Post('crquest')
  crquest(@Body() dto: CreateQuestionDTO): Promise<CreateQuestionDTO> {
    return this.questionService.createQuestion(dto);
  }

  @ApiTags('delete questions')
  //ParseIntPipe — это встроенный в NestJS pipe, который автоматически преобразует входную строку в целое число и выбрасывает исключение, если значение не может быть преобразовано.
  @Delete(':id')
  delquest(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.questionService.deleteQuestion(id);
  }
}
