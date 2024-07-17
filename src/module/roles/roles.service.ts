import { Injectable } from '@nestjs/common';
import { CreateRoleDTO } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/roles.model';
import { UserRoles } from './models/user-roles.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role,
  @InjectModel(UserRoles) private userRoleRepository: typeof UserRoles
) {}
  async createRole(dto: CreateRoleDTO) {
    await this.roleRepository.create(dto);
    return dto;
  }
  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }
  async getUserRoleByValue(userId: number){
    const userRole = await this.userRoleRepository.findOne({where:{userId}})
    return userRole
  }
}
