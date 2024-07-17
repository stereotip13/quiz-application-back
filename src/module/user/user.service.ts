import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { AddRoleDto, CreateUserDTO, UpdateUserDto } from './dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UserService {
  constructor(
    //импортируем модель юзера из БД и возможность писать в БД данные
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}
  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
  //ниже обращаемся к БД и передаем параметры поиска
  async findUserBySnils(snils: string) {
    return this.userRepository.findOne({ where: { snils: snils } });
  }
  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    dto.password = await this.hashPassword(dto.password);
    //прежде чем присвоить роль ее надо получить
    const role = await this.roleService.getRoleByValue('user');
    const user = await this.userRepository.create({
      password: dto.password,
      otdel: dto.otdel,
      name: dto.name,
      rating: dto.rating,
      role: role,
      snils: dto.snils,
    });
    await user.$set('role',[role.id])
    return dto;
  }

  //ниже опишем способ получить юзера, не передавая пароль (приватные данные)
  async publicUser(snils: string) {
    return this.userRepository.findOne({
      where: { snils },
      attributes: { exclude: ['password'] },
    });
  }
  async updateUser(snils: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    try {
      this.userRepository.update(dto, { where: { snils: snils } });
      return dto;
    } catch (e) {
      throw new Error(e);
    }
  }
  async getAllUsers() {
    try {
      return this.userRepository.findAll({ include: { all: true } });
    } catch (e) {
      throw new Error(e);
    }
  }
  async addRole(dto: AddRoleDto){
    const user = await this.userRepository.findOne({where:{snils:dto.snils}})
    const role = await this.roleService.getRoleByValue(dto.role)
    console.log('пользовател',user)
    if (role && user){
      await user.$set('role', []);
      await user.$add('role', role.id)
      return dto
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
  }
  async deleteUser(snils: string): Promise<boolean> {
    try {
      await this.userRepository.destroy({ where: { snils: snils } });
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}
