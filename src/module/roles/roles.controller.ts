import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDTO } from './dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiTags('Roles Api')
  @ApiOperation({ summary: 'Создать роль' })
  @ApiResponse({ status: 201, type: CreateRoleDTO })
  @Post()
  create(@Body() dto: CreateRoleDTO) {
    return this.roleService.createRole(dto);
  }
  @ApiTags('Roles Api')
  @ApiOperation({ summary: 'Получить наименование роли' })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
