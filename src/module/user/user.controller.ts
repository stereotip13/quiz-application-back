import { CreateUserDTO } from './dto';
import { UserService } from './user.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('create-user')
  createUsers(@Body() dto: CreateUserDTO) {
    console.log(dto);
    return this.userService.createUser(dto);
  }
}
