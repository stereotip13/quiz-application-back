import { Injectable } from '@nestjs/common';
import { CreateRoleDTO } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
  async createRole(dto: CreateRoleDTO) {
    await this.roleRepository.create(dto);
    return dto;
  }
  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }
}
