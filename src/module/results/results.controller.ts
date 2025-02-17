import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateResultsDTO,
  UpdateResultsDTO,
  GetOneUserResultsDTO,
} from './dto';

@ApiTags('Results API')
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @ApiResponse({ status: 201, type: CreateResultsDTO })
  @Post()
  create(@Body() dto: CreateResultsDTO) {
    return this.resultsService.create(dto);
  }
  @ApiResponse({ status: 200, type: CreateResultsDTO }) //обновление результата UpdateResultsDTO
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateResultsDTO) {
    return this.resultsService.update(id, dto);
  }

  @ApiResponse({
    status: 200,
    type: [CreateResultsDTO],
    description: 'Get all results for user by SNILS',
  })
  @Post('user')
  getUserResults(@Body() dto: GetOneUserResultsDTO) {
    return this.resultsService.getUserResults(dto.snils);
  }

  @ApiResponse({ status: 200, type: [CreateResultsDTO] })
  @Get()
  getAll() {
    return this.resultsService.getAll();
  }
}
