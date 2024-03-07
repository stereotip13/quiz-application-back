import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto';

@Injectable()
export class AuthService {
  constructor(private readonly UserService: UserService) {}
  async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.UserService.findUserByName(dto.email);
  }
}
