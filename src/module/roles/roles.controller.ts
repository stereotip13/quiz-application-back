import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDTO } from './dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiTags('API create role')
  @Post()
  create(@Body() dto: CreateRoleDTO) {
    return this.roleService.createRole(dto);
  }
  @ApiTags('API get role')
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
