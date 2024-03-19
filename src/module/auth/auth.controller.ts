import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API') //move api inside swagger
  @ApiResponse({ status: 201, type: CreateUserDTO }) //move api inside swagger
  @HttpCode(200)
  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUsers(dto);
  }

  @ApiTags('API') //move api inside swagger
  @ApiResponse({ status: 200, type: AuthUserResponse }) //move api inside swagger
  @HttpCode(201)
  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('test')
  test() {
    return true;
  }
}
