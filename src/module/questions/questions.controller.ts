import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateQuestionDTO } from './dto';
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @ApiTags('question Api')
  @ApiResponse({ status: 201, type: CreateQuestionDTO })
  @ApiOperation({ summary: 'Добавить новый вопрос' })
  @Post('crquest')
  crquest(@Body() dto: CreateQuestionDTO): Promise<CreateQuestionDTO> {
    return this.questionService.createQuestion(dto);
  }

  @ApiTags('question Api')
  //ParseIntPipe — это встроенный в NestJS pipe, который автоматически преобразует входную строку в целое число и выбрасывает исключение, если значение не может быть преобразовано.
  @ApiOperation({ summary: 'Удалить вопрос по ID' })
  @Delete(':id')
  delquest(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.questionService.deleteQuestion(id);
  }
  @ApiTags('question Api')
  @ApiOperation({ summary: 'Получить все вопросы из БД' })
  @ApiResponse({ status: 200 })
  @Get()
  getAll() {
    return this.questionService.getAllQuestion();
  }
}
