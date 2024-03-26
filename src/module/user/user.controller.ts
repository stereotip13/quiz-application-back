import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { updateUserDto } from './dto';
import { UserService } from './user.service';
import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @Post('create-user')
  // createUsers(@Body() dto: CreateUserDTO) {
  //   console.log(dto);
  //   return this.userService.createUser(dto);
  // }
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUser(@Body() updateDto: updateUserDto, @Req() request) {
    const user = request;
    console.log(user);
    //return this.userService.updateUser(user.name, updateDto);
  }
}
