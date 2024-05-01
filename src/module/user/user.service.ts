import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  //ниже внедряем модель из БД
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
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
    await this.userRepository.create({
      password: dto.password,
      //otdel: dto.otdelр,//убал из обязательных к введению пользователем, генерится автоматом
      name: dto.name,
      //rating: dto.rating,//убал из обязательных к введению пользователем, генерится автоматом
      // role: dto.role,//убал из обязательных к введению пользователем, генерится автоматом
      snils: dto.snils,
    });
    return dto;
  }
  //ниже опишем способ получить юзера, не передавая пароль (приватные данные)
  async publicUser(snils: string) {
    return this.userRepository.findOne({
      where: { snils },
      attributes: { exclude: ['password'] },
    });
  }
  async updateUser(userId: number, dto: UpdateUserDto): Promise<UpdateUserDto> {
    try {
      await this.userRepository.update(dto, { where: { id: userId } });
      return dto;
    } catch (e) {
      throw new Error(e);
    }
  }
  //чей токен того и удаляем
  async deleteUser(userId: number): Promise<boolean> {
    try {
      await this.userRepository.destroy({ where: { id: userId } });
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}
