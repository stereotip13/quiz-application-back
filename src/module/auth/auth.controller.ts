import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { AuthUserResponse } from './response';
import { Roles } from 'src/guards/roles-auth.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: AuthService,
  ) {}

  @ApiTags('API registr') //move api inside swagger
  @ApiResponse({ status: 201, type: AuthUserResponse }) //move api inside swagger
  @HttpCode(200)
  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUsers(dto);
  }

  @ApiTags('API login') //move api inside swagger
  @ApiResponse({ status: 200, type: AuthUserResponse }) //move api inside swagger
  @HttpCode(201)
  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<UserLoginDTO> {
    return this.authService.loginUser(dto);
  }
  @ApiTags('API test jwt')
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('test')
  test() {
    return true;
  }
}
