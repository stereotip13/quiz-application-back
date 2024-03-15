import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API') //move api inside swagger
  @ApiResponse({ status: 201, type: CreateUserDTO }) //move api inside swagger
  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUsers(dto);
  }

  @ApiTags('API') //move api inside swagger
  @ApiResponse({ status: 200, type: AuthUserResponse }) //move api inside swagger
  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }
}
