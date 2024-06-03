import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateQuestionDTO } from './dto';
import { Questions } from './models/questions.model';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Questions)
    private readonly questionRepository: typeof Questions,
  ) {}

  async createQuestion(dto: CreateQuestionDTO): Promise<CreateQuestionDTO> {
    await this.questionRepository.create({
      text: dto.text,
      right_ansv: dto.right_ansv,
      wrong_answ1: dto.wrong_answ1,
      wrong_answ2: dto.wrong_answ2,
      wrong_answ3: dto.wrong_answ3,
      category: dto.category,
      difficulty: dto.difficulty,
    });
    return dto;
  }
  async getQuestionByValue(
    id: number,
    dto: CreateQuestionDTO,
  ): Promise<CreateQuestionDTO> {
    try {
      await this.questionRepository.update(dto, { where: { id } });
      return dto;
    } catch (e) {
      throw new Error(e);
    }
  }
  async deleteQuestion(id: number): Promise<boolean> {
    try {
      await this.questionRepository.destroy({ where: { id } });
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}
