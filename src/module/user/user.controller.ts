import { UpdateUserDto } from './dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('create-user')
  // createUsers(@Body() dto: CreateUserDTO) {
  //   console.log(dto);
  //   return this.userService.createUser(dto);
  // }
  @ApiTags('API users update')
  @ApiOperation({ summary: 'обновление данных пользователя' })
  @ApiResponse({ status: 200, type: UpdateUserDto })
  @UseGuards(AuthGuard('jwt'))
  @Patch()
  updateUser(
    @Body() updateDto: UpdateUserDto,
    @Req() request,
  ): Promise<UpdateUserDto> {
    const user = request.user;
    console.log(user);
    return this.userService.updateUser(user.id, updateDto);
  }
  @ApiTags('API users delete')
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  deleteUser(@Req() request): Promise<boolean> {
    const user = request.user;
    return this.userService.deleteUser(user.id);
  }
}
