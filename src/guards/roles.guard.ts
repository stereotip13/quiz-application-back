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
            console.log(token)
            const secretOrKey: configService('secret_jwt')
            const user = this.jwtService.verify(token, {secret:'EbatKakoySecret'});//тут ошибка
            console.log(user)
            req.user = user
            return user.roles.some(role=>requiredRoles.includes(role.value))
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