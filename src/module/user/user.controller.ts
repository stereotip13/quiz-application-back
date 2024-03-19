import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CreateUserDTO, updateUserDto } from './dto';
import { UserService } from './user.service';
import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('create-user')
  createUsers(@Body() dto: CreateUserDTO) {
    console.log(dto);
    return this.userService.createUser(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() updateDto: updateUserDto, @Req() request) {
    const user = request.user;
    console.log(user);
  }
}
