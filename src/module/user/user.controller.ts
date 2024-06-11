import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @Post('create-user')
  // createUsers(@Body() dto: CreateUserDTO) {
  //   console.log(dto);
  //   return this.userService.createUser(dto);
  // }
  @ApiTags('API user update')
  @ApiResponse({ status: 200, type: UpdateUserDto })
  @ApiOperation({ summary: 'Обновить пользователя' })
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(
    @Body() updateDto: UpdateUserDto,
    @Req() request,
  ): Promise<UpdateUserDto> {
    const user = request.user;
    console.log('payload из jwt, который передается в updateUser:', user);
    //ниже вызывается ф-ция которая обновляет юзера, принимает параметр для поиска (расшифрованный из jwt) и ДТО
    return this.userService.updateUser(user.snils, updateDto);
  }
  @ApiTags('API get all users')
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200 })
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiTags('API users delete')
  @Delete(':snils')
  deleteUser(@Param('snils') snils:string ): Promise<boolean> {
    return this.userService.deleteUser(snils);
  }
}
