import { TokenService } from './../token/token.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto';
import { AppError } from 'src/common/constants/errors';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}
  async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.userService.findUserByName(dto.name); //ищем пользователя в базе данных
    if (existUser) throw new BadRequestException(AppError.USER_EXIST); //если не нах выводим ошибку, что п сущ-т
    return this.userService.createUser(dto);
  }
  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByName(dto.name); //ищем пользователя в базе данных
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST); //если не нах выводим ошибку, что п не сущ-т
    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    ); //если пароль правильный тру
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA); //если пароль не правильный возвращаем ошибку
    const userData = {
      name: existUser.name,
      role: existUser.role,
    };
    const token = await this.tokenService.genereteJwtToken(userData); //внутрь передаем данные для генер токена, к примеру имя
    const user = await this.userService.publicUser(dto.name);
    return { ...user, token };
  }
}
