import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Result } from './models/results.model';
import { CreateResultsDTO, UpdateResultsDTO } from './dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ResultsService {
  constructor(
    @InjectModel(Result)
    private resultRepository: typeof Result,
    private userService: UserService,
  ) {}

  async create(dto: CreateResultsDTO): Promise<Result> {
    const user = await this.userService.findUserBySnils(dto.snils);
    if (!user) {
      throw new NotFoundException(`User with SNILS ${dto.snils} not found`);
    }
    return await this.resultRepository.create({
      user_id: user.id,
      user_results: dto.user_results,
    });
  }

  async update(id: string, dto: UpdateResultsDTO): Promise<Result> {
    const result = await this.resultRepository.findByPk(id);
    if (result) {
      return await result.update(dto);
    }
    throw new Error('Result not found');
  }

  async getById(id: string): Promise<Result> {
    const result = await this.resultRepository.findByPk(id);
    if (!result) throw new Error('Result not found');
    return result;
  }

  async getAll(): Promise<Result[]> {
    return await this.resultRepository.findAll({
      include: { all: true },
    });
  }
}
