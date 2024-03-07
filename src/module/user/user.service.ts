import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto';
import { AppError } from 'src/common/constants/errors';

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
    return this.userRepository.findOne({ where: { name } });
  }
  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.findUserByName(dto.name);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST); //выкидышь ошибки
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
}
