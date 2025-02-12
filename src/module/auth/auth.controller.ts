import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
//import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { AuthUserResponse } from './response';
import { Roles } from 'src/guards/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserLoginDTO } from './dto';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: AuthService,
  ) {}

  @ApiTags('Auth API') //move api inside swagger
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201, type: AuthUserResponse }) //move api inside swagger
  @HttpCode(200)
  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUsers(dto);
  }

  @ApiTags('Auth API') //move api inside swagger
  @ApiOperation({ summary: 'Логин пользователя' })
  @ApiResponse({ status: 200, type: AuthUserResponse }) //move api inside swagger
  @HttpCode(201)
  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<CreateUserDTO> {
    return this.authService.loginUser(dto);
  }
  @ApiTags('Auth API')
  @ApiOperation({ summary: 'Проверка роли админа' })
  @Roles('admin')
  @UseGuards(RolesGuard)
  @Post('test')
  test() {
    return true;
  }
}
