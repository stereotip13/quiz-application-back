import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, updateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}
  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
  //ниже обращаемся к БД и передаем параметры поиска
  async findUserByName(name: string) {
    return this.userRepository.findOne({ where: { name: name } });
  }
  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    dto.password = await this.hashPassword(dto.password);
    await this.userRepository.create({
      password: dto.password,
      otdel: dto.otdel,
      name: dto.name,
      rating: dto.rating,
      role: dto.role,
    });
    return dto;
  }
  //ниже опишем способ получить юзера, не передавая пароль (приватные данные)
  async publicUser(name: string) {
    return this.userRepository.findOne({
      where: { name },
      attributes: { exclude: ['password'] },
    });
  }
  async updateUser(name: string, dto: updateUserDto) {
    return this.userRepository.update(dto, { where: { name: name } });
  }
}
