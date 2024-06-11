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
  //dto: название ДТО используется для проверки входящих данных
  async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {
    try {
      const existUser = await this.userService.findUserBySnils(dto.snils); //ищем пользователя в базе данных
      if (existUser) throw new BadRequestException(AppError.USER_EXIST); //если не нах выводим ошибку, что п сущ-т
      return this.userService.createUser(dto);
    } catch (e) {
      throw new BadRequestException(AppError.USER_EXIST);
    }
  }
  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
    try {
      const existUser = await this.userService.findUserBySnils(dto.snils); //ищем пользователя в базе данных
      if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST); //если не нах выводим ошибку, что п не сущ-т
      //валадция пароля
      const validatePassword = await bcrypt.compare(
        dto.password,
        existUser.password,
      ); //если пароль правильный тру
      if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA); //если пароль не правильный возвращаем ошибку
      const userData = {
        role: existUser.role,
        snils: existUser.snils,
      };

      //создаем токен для нашего юзера и внутрь передаем данные для генер токена: роль и снилс
      const token = await this.tokenService.genereteJwtToken(userData);
      //получим данные нашего публичного юзера
      const user = await this.userService.publicUser(dto.snils);
      return { ...user, token }; //копирует все собственные перечисляемые свойства из объекта user в новый объект и добавляет туда токен
    } catch (e) {
      throw new Error(e);
    }
  }
}
