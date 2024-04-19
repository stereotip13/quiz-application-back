import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
//import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  //чтобы сервис можно было использовать внутри контроллера необходимо сделать инъекцию
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API auth') //swagger описание контроллера
  @ApiResponse({ status: 201, type: CreateUserDTO }) //swagger api статус ответа и какие данные вернет
  @HttpCode(200)
  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUsers(dto);
  }

  @ApiTags('API auth') //swagger описание контроллера
  @ApiResponse({ status: 200, type: AuthUserResponse }) //swagger api статус ответа и какие данные вернет
  @HttpCode(201)
  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }
  @ApiTags('API private auth')
  @UseGuards(AuthGuard('jwt'))
  @Post('test')
  test() {
    return true;
  }
}
