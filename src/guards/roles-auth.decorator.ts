//декоратор. Создаем константу с ключем и по этому ключу будем получать данные внутри гварда

import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles)