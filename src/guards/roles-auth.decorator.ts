//декоратор. Создаем константу с ключем и по этому ключу будем получать данные внутри гварда

import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'role';
export const Roles = (...role: string[]) => SetMetadata(ROLES_KEY, role)