import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService:JwtService, private readonly configService: ConfigService,
        private reflector:Reflector
    ){
    }

    //суть фции canActivate когда она возвращает тру доступ разрешен
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try{
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY,[
                context.getHandler(),
                context.getClass(),
            ])
            if (!requiredRoles){
                return true
            }
            const req = context.switchToHttp().getRequest() //получаем объект реквеста из контекста
            const authHeader = req.headers.authorization; //объект в котором тип токена и сам токен
            const bearer = authHeader.split(' ')[0] //
            const token = authHeader.split(' ')[1]
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }
            console.log("токен который есть",token)
            const secretOrKey = this.configService.get('secret_jwt')
            const user = this.jwtService.verify(token, {secret:secretOrKey});//тут ошибка
            req.user = user
            console.log("роль юзера",user.user.role
            )

            //Проверяем, соответствует ли роль пользователя одной из требуемых ролей
            const hasRole = requiredRoles.includes(user.user.role); // Используем user.user.role, т.к. роль находится во вложенном объекте user
            return hasRole
            //return user.role.some(role=>requiredRoles.includes(role.value))
        } catch (e){
            console.log(e)
            if (e instanceof TokenExpiredError) {
                throw new UnauthorizedException('Токен истек');
              } else if (e instanceof JsonWebTokenError) {
                throw new UnauthorizedException('Неверный токен');
              } else {
                throw new HttpException("Нет доступа", HttpStatus.FORBIDDEN)
              }
        }
    }

}