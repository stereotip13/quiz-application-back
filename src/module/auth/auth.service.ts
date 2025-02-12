import { TokenService } from './../token/token.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto';
import { AppError } from 'src/common/constants/errors';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly roleService: RolesService,
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
      let urole;
      let userSnils;
      const existUser = await this.userService.findUserBySnils(dto.snils);
      //если пользователь не найден в базе данных, создаем нового пользователя
      //с базовыми значениями: пустой отдел, нулевой рейтинг, пустое имя и роль user
      //используем данные из dto (snils и password) которые пришли при попытке логина
      if (!existUser) {
        const newUserDto: CreateUserDTO = {
          snils: dto.snils,
          password: dto.password,
          otdel: '',
          rating: 0,
          name: dto.name,
          role: {}, // Роль будет установлена через roleService в createUser
        };
        await this.userService.createUser(newUserDto);
        urole = 'user';
        userSnils = dto.snils;
      } else {
        userSnils = existUser.snils;
        const userRole = await this.roleService.getUserRoleByValue(
          existUser.id,
        );
        if (userRole.roleId === 2) {
          urole = 'admin';
        } else if (userRole.roleId === 1) {
          urole = 'user';
        } else if (userRole.roleId === 3) {
          urole = 'redaktor';
        }
      }
      const userData = {
        role: urole,
        snils: userSnils,
      };

      //создаем токен для нашего юзера и внутрь передаем данные для генер токена: роль и снилс
      const token = await this.tokenService.genereteJwtToken(userData);
      //получим данные нашего публичного юзера, то есть без пароля
      const user = await this.userService.publicUser(dto.snils);
      if (!user) throw new Error('User not found');
      return { ...user, token };
    } catch (e) {
      throw new Error(e);
    }
  }
}
