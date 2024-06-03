import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @Post('create-user')
  // createUsers(@Body() dto: CreateUserDTO) {
  //   console.log(dto);
  //   return this.userService.createUser(dto);
  // }
  @ApiTags('API users')
  @ApiResponse({ status: 200, type: UpdateUserDto })
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
  @ApiTags('API users delete')
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.userService.deleteUser(id);
  }
}
