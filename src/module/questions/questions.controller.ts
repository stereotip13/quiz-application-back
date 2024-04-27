import { Questions } from './models/questions.model';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { Body, Controller, Delete, Post, Req } from '@nestjs/common';
import { CreateQuestionDTO } from './dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @ApiTags('questions create')
  @ApiResponse({status:201, type: CreateQuestionDTO})
  @Post('crquest')
  crquest(@Body() dto:CreateQuestionDTO): Promise<CreateQuestionDTO> {
    return this.questionService.createQuestion (dto)
  }

  @ApiTags('delete questions')
  @Delete()
  delquest(@Req() request): Promise<boolean> {
    const question = request.question
    return this.questionService.deleteQuestion(question.id)
  }
}
