import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateResultsDTO, UpdateResultsDTO } from './dto';

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
  @ApiResponse({ status: 200, type: CreateResultsDTO }) //получение результата по id ResultsDTO
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.resultsService.getById(id);
  }
  @ApiResponse({ status: 200, type: CreateResultsDTO })
  @Get()
  getAll() {
    return this.resultsService.getAll();
  }
}
