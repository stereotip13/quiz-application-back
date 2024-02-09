import { Controller, Get } from '@nestjs/common';

@Controller('/user')
export class UserController {
  create() {}
  @Get()
  getAll() {
    return 'poshel na hui';
  }
  getOne() {}
  delete() {}
}
